namespace Medicine.Domain.Dto.ManagementDto
{
    public class SaleRequestDto : BasePaginationRequestDto
    {
        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
    }
}
