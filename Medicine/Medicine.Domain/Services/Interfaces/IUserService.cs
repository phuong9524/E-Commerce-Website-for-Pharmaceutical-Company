using Medicine.Domain.Dto;
using Medicine.Domain.Dto.UserDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface IUserService
    {
        UserResponseDto GetInfo(Guid id, ContextDto contextDto);

        IList<UserResponseDto> GetUsers();

        string? Login(LoginRequestDto loginRequest);

        Guid CreateUser(CreateNewUserRequestDto addNewUser, ContextDto contextDto);

        Guid RegisterUser(CreateNewUserRequestDto addNewUser);

        List<string> GetRoles();

        void ModifyInfo(UserModificationDto userModificationDto);

        void ChangePassword(UserChangePasswordDto userChangePasswordDto);
    }
}
