using Microsoft.ML.Data;

namespace Medicine.Domain.Dto.CommentDto
{
    public class ModelCommentInputDto
    {
        [LoadColumn(0)]
        [ColumnName(@"Sentence")]
        public string Sentence { get; set; }

        [LoadColumn(1)]
        [ColumnName(@"Label")]
        public float Label { get; set; }
    }
}
