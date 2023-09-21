namespace Medicine.Domain.Dto.ManagementDto
{
    public class StatisticProductsResponseDto
    {
        public StatisticProduct Product { get; set; }
    }

    public class StatisticProduct
    {
        public int TotalSales { get; set; }

        public List<TopProductSales> TopProductSales { get; set; }
    }

    public class TopProductSales
    {
        public Guid Id { get; set; }

        public string NameProduct { get; set; }

        public int TotalSales { get; set; }
    }
}
