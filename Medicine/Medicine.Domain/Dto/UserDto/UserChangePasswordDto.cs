namespace Medicine.Domain.Dto.UserDto
{
    public class UserChangePasswordDto
    {
        public Guid Id { get; set; }

        public string OldPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
