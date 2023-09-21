namespace Medicine.Domain.Dto.UserDto
{
    public class UserModificationDto
    {
        public Guid Id { get; set; }

        public string? UserName { get; set; }

        public string? FullName { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public string? Avatar { get; set; }
    }
}
