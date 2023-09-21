using Medicine.Domain.Dto;
using Medicine.Domain.Dto.ProductDto;
namespace Medicine.Domain.Services.Interfaces
{
    public interface IProductService
    {
        PaginationDto<ProductResponseDto> GetProducts(ProductRequestDto paginationRequestDto);

        Guid CreateProduct(ProductCreateDto createProductDto);

        Guid UpdateProduct(ProductUpdateDto updateProductDto);

        ProductDetailDto GetProduct(Guid id);

        void DeleteProduct(Guid id);
    }
}
