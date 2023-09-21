namespace Medicine.Domain.Dto.ManagementDto
{
    public class EmployeeResponseDto
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? LastLogIn { get; set; }

        public IList<string> Roles { get; set; }
    }
}
