using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.ManagementDto
{
    public class CustomerRequestDto : BasePaginationRequestDto
    {
        public SortTypes SortTypes { get; set; }
    }
}
