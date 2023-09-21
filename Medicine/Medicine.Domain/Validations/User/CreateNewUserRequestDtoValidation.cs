using FluentValidation;
using Medicine.Domain.Dto.UserDto;

namespace Medicine.Domain.Validations.User
{
    public class CreateNewUserRequestDtoValidation : AbstractValidator<CreateNewUserRequestDto>
    {
        public CreateNewUserRequestDtoValidation()
        {
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Users name is required");
            RuleFor(x => x.FullName).NotEmpty().WithMessage("Full name is required");

            RuleFor(s => s.Email).NotEmpty().WithMessage("Email is required")
                     .EmailAddress().WithMessage("A valid email is required");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required");
            RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number is required");
        }
    }
}
