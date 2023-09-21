namespace Medicine.Domain.Dto.ManagementDto
{
    public class StatisticOrdersResponseDto
    {
        public int TotalEmployees { get; set; }

        public StatisticOrdersDto Order { get; set; }
    }

    public class StatisticOrdersDto
    {
        public int totalOrderSuccess { get; set; }

        public long TotalSum { get; set; }

        public Profit ProfitThisYear { get; set; }

        public Profit ProfitLastYear { get; set; }
    }

    public class Profit
    {
        public long TotalSum { get; set; }

        public TotalSumEachMonth TotalSumEachMonth { get; set; }
    }

    public class TotalSumEachMonth
    {
        public long Jan { get; set; }

        public long Feb { get; set; }

        public long Mar { get; set; }

        public long Apr { get; set; }

        public long May { get; set; }

        public long Jun { get; set; }

        public long Jul { get; set; }

        public long Aug { get; set; }

        public long Sep { get; set; }

        public long Oct { get; set; }

        public long Nov { get; set; }

        public long Dec { get; set; }
    }
}
