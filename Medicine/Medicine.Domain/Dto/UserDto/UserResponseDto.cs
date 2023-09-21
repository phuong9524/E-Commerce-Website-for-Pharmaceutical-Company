namespace Medicine.Domain.Dto.UserDto
{
    public class UserResponseDto
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Avatar { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public IList<string> Roles { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
