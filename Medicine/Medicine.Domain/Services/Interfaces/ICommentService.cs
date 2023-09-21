using Medicine.Domain.Dto;
using Medicine.Domain.Dto.CommentDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface ICommentService
    {
        Guid SendComment(SendCommentDto sendCommentDto);

        void DeleteComment(Guid id, ContextDto contextDto);

        PaginationDto<CommentResponseDto> GetComments(CommentRequestDto commentRequestDto);

        PaginationDto<CommentResponseDto> GetAllComments(BasePaginationRequestDto basePaginationRequestDto);

        float GetAveragePoints(Guid productId);

        Guid ModifyComment(CommentModifyDto commentModifyDto);
    }
}
