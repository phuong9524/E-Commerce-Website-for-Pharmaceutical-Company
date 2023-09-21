using Medicine.Domain.Dto.ProductTypeDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface IProductTypeService
    {
        IList<ProductTypeResponseDto> GetProductTypes();
    }
}
