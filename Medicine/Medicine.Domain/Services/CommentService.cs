using Medicine.DataAccess.Entites;
using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CommentDto;
using Medicine.Domain.Dto.ProductDto;
using Medicine.Domain.Enums;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Extensions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.ML;
using Microsoft.ML.Data;
using Microsoft.ML.TorchSharp;
using Microsoft.ML.TorchSharp.NasBert;
using static Microsoft.ML.DataOperationsCatalog;

namespace Medicine.Domain.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _db;

        public CommentService(IUnitOfWork db)
        {
            _db = db;
        }

        public void DeleteComment(Guid id, ContextDto contextDto)
        {
            var isAdmin = contextDto.UserRoles.Any(ur => ur.Equals("Admin"));
            var comment = _db.Comments.GetAll()
                            .Where(c => c.Id == id && (c.UserId == contextDto.UserId || isAdmin))
                            .FirstOrDefault();

            if(comment != null) 
            { 
                var cart = _db.Carts.GetAll()
                            .Where(c => c.UserId == comment.UserId && c.ProductId == comment.ProductId && !c.CanComment)
                            .FirstOrDefault();

                _db.Comments.Remove(comment);
                cart.CanComment = true;

                return;
            }

            throw new NotFoundException($"Comment is not found with {id}");
        }

        public Guid ModifyComment(CommentModifyDto commentModifyDto)
        {
            var comment = _db.Comments.GetAll()
                            .Where(c => c.Id == commentModifyDto.Id && c.UserId == commentModifyDto.UserId)
                            .FirstOrDefault();

            if (comment != null)
            {
                comment.Points = commentModifyDto.Points;
                comment.Content = commentModifyDto.Content;

                return comment.Id;
            }

            throw new NotFoundException($"Comment is not found with {commentModifyDto.Id}");
        }

        public PaginationDto<CommentResponseDto> GetAllComments(BasePaginationRequestDto basePaginationRequestDto)
        {
            var result = _db.Comments.GetAll(true)
                            .OrderByDescending(c => c.CreatedAt)
                            .Select(c => new CommentResponseDto
                            {
                                Id = c.Id,
                                Content = c.Content,
                                Images = c.Images,
                                CreatedAt = (DateTime)c.CreatedAt,
                                Points = c.Points,
                                Product = new ProductResponseDto
                                {
                                    Id = c.Product.Id,
                                    Images = c.Product.Images,
                                    Name = c.Product.Name,
                                    Price = c.Product.Price,
                                },
                                User = _db.Users.GetAll(true)
                                            .Where(u => u.Id == c.UserId)
                                            .Select(u => new CommentUser
                                            {
                                                Id = u.Id,
                                                Avatar = u.Avatar,
                                                FullName = u.FullName
                                            }).FirstOrDefault(),
                                Mood = ((CommentIntents)c.Conduct).ToString()
                            }).Paginate(basePaginationRequestDto.PageIndex, basePaginationRequestDto.PageSize);

            return result;
        }

        public PaginationDto<CommentResponseDto> GetComments(CommentRequestDto commentRequestDto)
        {
            var result = _db.Comments.GetAll(true)
                            .Where(c => c.ProductId == commentRequestDto.ProductId)
                                .Include(c => c.Product)
                            .OrderByDescending(c => c.CreatedAt)
                            .Select(c => new CommentResponseDto
                            {
                                Id = c.Id,
                                Content = c.Content,
                                Images = c.Images,
                                CreatedAt = (DateTime)c.CreatedAt,
                                Points = c.Points,
                                User = _db.Users.GetAll(true)
                                            .Where(u => u.Id == c.UserId)
                                            .Select(u => new CommentUser
                                            {
                                                Id= u.Id,
                                                Avatar = u.Avatar,
                                                FullName = u.FullName
                                            }).FirstOrDefault(),
                                Mood = ((CommentIntents)c.Conduct).ToString()
                            }).Paginate(commentRequestDto.PageIndex, commentRequestDto.PageSize);

            return result;
        }

        public float GetAveragePoints(Guid productId)
        {
            var averagePoints = _db.Comments.GetAll(true)
                            .Where(c => c.ProductId == productId)
                            .Average(c => c.Points);

            return averagePoints;
        }

        public Guid SendComment(SendCommentDto sendCommentDto)
        {
            var result = CheckCommentMoods(sendCommentDto.Content);
            
            var cart = _db.Carts.GetAll()
                                .Where(c => c.UserId == sendCommentDto.UserId
                                    && c.ProductId == sendCommentDto.ProductId
                                    && c.CanComment)
                                .FirstOrDefault();

            if (cart != null)
            {
                if (cart.CanComment)
                {
                    var comment = new Comment
                    {
                        UserId = sendCommentDto.UserId,
                        ProductId = sendCommentDto.ProductId,
                        Images = sendCommentDto.Images,
                        Content = sendCommentDto.Content,
                        Points = sendCommentDto.Points,
                        Conduct = result,
                    };

                    _db.Comments.Add(comment);

                    cart.CanComment = false;

                    return comment.Id;
                }
            }

            throw new ForbiddenException("You cant comment in this product.");
        }

        private float CheckCommentMoods(string content)
        {
            // Initialize
            MLContext mlContext = new()
            {
                GpuDeviceId = 0,
                FallbackToCpu = true
            };

            // Load your data
            string dir = Directory.GetCurrentDirectory();
            var reviewsDV = mlContext.Data.LoadFromTextFile<ModelCommentInputDto>(dir + "\\Comment.txt", separatorChar: '\t', hasHeader: false);

            TrainTestData splitDataView = mlContext.Data.TrainTestSplit(reviewsDV, testFraction: 0.2);
            var trainData = splitDataView.TrainSet;
            var testData = splitDataView.TestSet;

            var pipeLine = mlContext.Transforms.Conversion.MapValueToKey(
                                                outputColumnName: "Label",
                                                inputColumnName: "Label")
                            .Append(mlContext.MulticlassClassification.Trainers.TextClassification(
                                                labelColumnName: "Label",
                                                sentence1ColumnName: "Sentence",
                                                architecture: BertArchitecture.Roberta))
                            .Append(mlContext.Transforms.Conversion.MapKeyToValue(
                                                outputColumnName: "PredictedLabel",
                                                inputColumnName: "PredictedLabel"));

            Console.WriteLine("Training model...");
            var model = pipeLine.Fit(trainData);

            // Evaluate the model's performance against the TEST data set
            Console.WriteLine("Evaluating model performance...");

            // We need to apply the same transformations to our test set so it can be evaluated via the resulting model
            var transformTest = model.Transform(testData);
            var metrics = mlContext.MulticlassClassification.Evaluate(transformTest);

            // Display Metrics
            Console.WriteLine($"Macro Accuracy: {metrics.MacroAccuracy}");
            Console.WriteLine($"Micro Accuracy: {metrics.MicroAccuracy}");
            Console.WriteLine($"Log Loss: {metrics.LogLoss}");
            Console.WriteLine();

            // List different intents with their class number
            Console.WriteLine("Classes:");
            foreach (CommentIntents value in Enum.GetValues<CommentIntents>())
            {
                Console.WriteLine($"{((int)value)}: {value}");
            }
            // Generate the table for diagnostics
            Console.WriteLine(metrics.ConfusionMatrix.GetFormattedConfusionTable());

            // Prediction
            Console.WriteLine("Creating prediction engine...");
            PredictionEngine<ModelCommentInputDto, ModelCommentOutputDto> engine = mlContext.Model.CreatePredictionEngine<ModelCommentInputDto, ModelCommentOutputDto>(model);
            ModelCommentInputDto sampleData = new ModelCommentInputDto
            {
                Sentence = content
            };

            ModelCommentOutputDto result = engine.Predict(sampleData);

            // Print classification
            float maxScore = result.Score[(uint)result.PredictedLabel];
            Console.WriteLine($"Matched intent {result.PredictedLabel} with score of {maxScore:f2}");
            Console.WriteLine();

            return result.PredictedLabel;
        }
    }
}
