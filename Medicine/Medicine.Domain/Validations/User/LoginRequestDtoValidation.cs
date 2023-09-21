using FluentValidation;
using Medicine.Domain.Dto.UserDto;

namespace Medicine.Domain.Validations.User
{
    public class LoginRequestDtoValidation : AbstractValidator<LoginRequestDto>
    {
        public LoginRequestDtoValidation() 
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("You can not input empty or null email");
            RuleFor(x => x.Password).NotEmpty().WithMessage("You can not input empty or null password");
        }
    }
}
