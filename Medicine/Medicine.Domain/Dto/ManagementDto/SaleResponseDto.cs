using Medicine.Domain.Dto.CartDto;

namespace Medicine.Domain.Dto.ManagementDto
{
    public class SaleResponseDto
    {
        public PaginationDto<CartResponseDto> Carts { get; set; }

        public long CurrentPageSum { get; set; }

        public long AllSum { get; set; }
    }
}
