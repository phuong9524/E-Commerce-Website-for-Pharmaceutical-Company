namespace Medicine.Domain.Dto.ManagementDto
{
    public class CustomerResponseDto
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime CreatedAt { get; set; }

        public int Orders { get; set; }

        public long SumMoney { get; set; }

        public DateTime? LastLogin { get; set; }
    }
}
