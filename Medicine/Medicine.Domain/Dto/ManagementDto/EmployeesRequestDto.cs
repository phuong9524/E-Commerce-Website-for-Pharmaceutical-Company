using Medicine.Domain.Enums;

namespace Medicine.Domain.Dto.ManagementDto
{
    public class EmployeesRequestDto : BasePaginationRequestDto
    {
        public string? Role { get; set; }

        public SortTypes SortTypes { get; set; }
    }
}
