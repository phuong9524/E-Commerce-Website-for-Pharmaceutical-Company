namespace Medicine.Domain.Dto.ManagementDto
{
    public class StatisticCustomersResponseDto
    {
        public Customer Customer { get; set; }
    }

    public class Customer
    {
        public int TotalCustomer { get; set; }

        public int TotalCustomerThisMonth { get; set; }

        public int TotalCustomerLastMonth { get; set; }
    }
}
