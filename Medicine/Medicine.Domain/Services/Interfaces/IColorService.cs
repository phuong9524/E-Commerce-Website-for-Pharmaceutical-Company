using Medicine.Domain.Dto.ColorDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface IColorService
    {
        ColorResponseDto GetOrderStatusColor(string status);
    }
}
