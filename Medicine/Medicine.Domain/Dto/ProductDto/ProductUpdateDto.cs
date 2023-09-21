namespace Medicine.Domain.Dto.ProductDto
{
    public class ProductUpdateDto : ProductCreateDto
    {
        public Guid Id { get; set; }
    }
}
