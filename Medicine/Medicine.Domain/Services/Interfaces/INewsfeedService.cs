using Medicine.Domain.Dto;
using Medicine.Domain.Dto.NewsfeedDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface INewsfeedService
    {
        Guid CreateNewsfeed(NewsfeedCreateDto newsfeedCreateDto);

        NewsfeedDetailDto GetDetail(Guid id);

        PaginationDto<NewsfeedResponseDto> GetNewsfeeds(NewsfeedRequestDto newsfeedRequestDto);

        void DeleteNewsfeed(Guid id);
    }
}
