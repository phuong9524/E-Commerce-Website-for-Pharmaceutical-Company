using Medicine.DataAccess.Entites;
using Medicine.Domain.Dto;
using Medicine.Domain.Dto.NewsfeedDto;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Extensions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using System.Linq;

namespace Medicine.Domain.Services
{
    public class NewsfeedService : INewsfeedService
    {
        private readonly IUnitOfWork _db;

        public NewsfeedService(IUnitOfWork db)
        {
            _db = db;
        }

        public Guid CreateNewsfeed(NewsfeedCreateDto newsfeedCreateDto)
        {
            var newsfeed = new Newsfeed
            {
                Title = newsfeedCreateDto.Title,
                Content = newsfeedCreateDto.Content,
                Image = newsfeedCreateDto.Image,
                UserId = newsfeedCreateDto.UserId,
            };

            _db.Newsfeeds.Add(newsfeed);

            return newsfeed.Id;
        }

        public void DeleteNewsfeed(Guid id)
        {
            var newsfeed = _db.Newsfeeds.GetAll()
                            .Where(nf => nf.Id == id && !nf.IsDeleted)
                            .FirstOrDefault();

            if(newsfeed!= null) 
            { 
                newsfeed.IsDeleted = true;

                return;
            }

            throw new NotFoundException($"Newsfeed is not found with {id}");
        }

        public NewsfeedDetailDto GetDetail(Guid id)
        {
            var newsfeed = _db.Newsfeeds.GetAll(true).Where(nf => nf.Id == id && !nf.IsDeleted)
                            .Select(nf => new NewsfeedDetailDto
                            {
                                Id = nf.Id,
                                Title = nf.Title,
                                Content = nf.Content,
                                CreatedAt = (DateTime)nf.CreatedAt,
                                Image = nf.Image,
                            }).FirstOrDefault();

            return newsfeed;
        }

        public PaginationDto<NewsfeedResponseDto> GetNewsfeeds(NewsfeedRequestDto newsfeedRequestDto)
        {
            var newsfeeds = _db.Newsfeeds.GetAll(true)
                            .Where(nf => !nf.IsDeleted)
                            .WhereIf(!string.IsNullOrEmpty(newsfeedRequestDto.Keyword), nf => nf.Title.Contains(newsfeedRequestDto.Keyword))
                            .OrderByDescending(nf => nf.CreatedAt)
                            .Select(nf => new NewsfeedResponseDto
                            {
                                Id = nf.Id,
                                Title = nf.Title,
                                Image = nf.Image,
                                CreatedAt = (DateTime)nf.CreatedAt,
                            }).Paginate(newsfeedRequestDto.PageIndex, newsfeedRequestDto.PageSize);

            return newsfeeds;
        }
    }
}
