using FluentValidation;
using FluentValidation.Results;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Dto;
using Medicine.Domain.Dto.UserDto;
using Medicine.Domain.Exceptions;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;
using Medicine.Domain.Validations.User;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Medicine.Domain.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;
        private readonly IUnitOfWork _db;

        public UserService(IUnitOfWork db, IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        public UserResponseDto GetInfo(Guid id, ContextDto contextDto)
        {
            var user = _db.Users.GetAll(true).Where(u => !u.IsDeleted)
                .Where(u => (u.Id == id && contextDto.UserRoles.Contains("Admin")) 
                            || (u.Id == id && u.Id == contextDto.UserId))
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    FullName = u.FullName,
                    Address = u.Address,
                    Avatar = u.Avatar,
                    CreatedAt = (DateTime)u.CreatedAt,
                    PhoneNumber = u.PhoneNumber,
                    Roles = u.Roles.Select(ur => ur.Role).ToList()
                })
                .FirstOrDefault();

            return user;
        }

        public IList<UserResponseDto> GetUsers()
        {
            var user = _db.Users.GetAll(true).Where(u => !u.IsDeleted)
                .Select(u => new UserResponseDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    UserName = u.UserName,
                    FullName = u.FullName,
                    Address = u.Address,
                    Avatar = u.Avatar,
                    CreatedAt = (DateTime)u.CreatedAt,
                    PhoneNumber = u.PhoneNumber,
                    Roles = u.Roles.Select(ur => ur.Role).ToList()
                }).ToList();

            return user;
        }

        public Guid CreateUser(CreateNewUserRequestDto createNewUser, ContextDto contextDto)
        {
            CreateNewUserRequestDtoValidation validator = new CreateNewUserRequestDtoValidation();

            ValidationResult result = validator.Validate(createNewUser);
            validator.ValidateAndThrow(createNewUser);

            var isExist = _db.Users.GetAll(true).Any(u => u.Email == createNewUser.Email);

            if (isExist)
            {
                throw new ExistException("Email existed!");
            }

            var user = new User
            {
                UserName = createNewUser.UserName,
                FullName = createNewUser.FullName,
                Email = createNewUser.Email,
                Password = createNewUser.Password,
                PhoneNumber = createNewUser.PhoneNumber,
                Address = createNewUser.Address,
                Avatar = createNewUser.Avatar,
            };
            _db.Users.Add(user);
            _db.SaveChanges();

            if(createNewUser.Role != null)
            {
                var role = new UserRole
                {
                    Role = createNewUser.Role,
                    UserId = user.Id
                };
                _db.UserRoles.Add(role);
            }

            _db.SaveChanges();

            return user.Id;
        }

        public string? Login(LoginRequestDto loginRequest)
        {
            LoginRequestDtoValidation validator = new LoginRequestDtoValidation();

            ValidationResult result = validator.Validate(loginRequest);
            validator.ValidateAndThrow(loginRequest);

            var claimUser = _db.Users.GetAll(true).Where(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password)
                            .Select(u => new UserResponseDto
                            {
                                Id = u.Id,
                                Email = u.Email,
                                UserName = u.UserName,
                                FullName = u.FullName,
                                Address = u.Address,
                                Avatar = u.Avatar,
                                CreatedAt = (DateTime)u.CreatedAt,
                                PhoneNumber = u.PhoneNumber,
                                Roles = u.Roles.Select(ur => ur.Role).ToList()
                            }).FirstOrDefault();

            if (claimUser != null)
            {
                var user = _db.Users.GetAll().Where(u => u.Email == loginRequest.Email && u.Password == loginRequest.Password).FirstOrDefault();
                user.LastLogIn = DateTime.Now;

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("Id", claimUser.Id.ToString()),
                    new Claim("Email", claimUser.Email),
                    new Claim("FullName", claimUser.FullName),
                    new Claim("UserName", claimUser.UserName),
                    new Claim("Roles", string.Join(",", claimUser.Roles))
                };

                foreach(var role in claimUser.Roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

                var signIn = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddHours(24), signingCredentials: signIn);

                return $"Bearer {new JwtSecurityTokenHandler().WriteToken(token)}";
            }

            throw new NotFoundException("User not found. Make sure your email and password are correct.");
        }

        public Guid RegisterUser(CreateNewUserRequestDto createNewUser)
        {
            CreateNewUserRequestDtoValidation validator = new CreateNewUserRequestDtoValidation();

            ValidationResult result = validator.Validate(createNewUser);
            validator.ValidateAndThrow(createNewUser);

            var isExist = _db.Users.GetAll(true).Any(u => u.Email == createNewUser.Email);

            if (isExist)
            {
                throw new ExistException("Email existed!");
            }

            var user = new User
            {
                UserName = createNewUser.UserName,
                FullName = createNewUser.FullName,
                Email = createNewUser.Email,
                Password = createNewUser.Password,
                PhoneNumber = createNewUser.PhoneNumber,
                Address = createNewUser.Address,
                Avatar = createNewUser.Avatar,
            };

            _db.Users.Add(user);
            _db.SaveChanges();

            return user.Id;
        }

        public List<string> GetRoles()
        {
            var result = _db.Roles.GetAll(true).Where(r => !r.IsDeleted).Select(r => r.Name).ToList();

            return result;
        }

        public void ModifyInfo(UserModificationDto userModificationDto)
        {
            var user = _db.Users.GetAll().Where(u => u.Id == userModificationDto.Id).FirstOrDefault();

            if (user != null)
            {
                user.UserName = !string.IsNullOrEmpty(userModificationDto.UserName)
                                ? userModificationDto.UserName
                                : user.UserName;

                user.FullName = !string.IsNullOrEmpty(userModificationDto.FullName)
                                ? userModificationDto.FullName
                                : user.FullName;

                user.Avatar = !string.IsNullOrEmpty(userModificationDto.Avatar)
                                ? userModificationDto.Avatar
                                : user.Avatar;

                user.Address = !string.IsNullOrEmpty(userModificationDto.Address)
                                ? userModificationDto.Address
                                : user.Address;

                user.PhoneNumber = !string.IsNullOrEmpty(userModificationDto.PhoneNumber)
                                ? userModificationDto.PhoneNumber
                                : user.PhoneNumber;

                _db.SaveChanges();

                return;
            }

            throw new NotFoundException("User not found.");
        }

        public void ChangePassword(UserChangePasswordDto userChangePasswordDto)
        {
            var user = _db.Users.GetAll().Where(u => u.Id == userChangePasswordDto.Id
                                                && u.Password == userChangePasswordDto.OldPassword).FirstOrDefault();
            
            if (user != null)
            {
                user.Password = userChangePasswordDto.NewPassword;

                _db.SaveChanges();

                return;
            }

            throw new NotFoundException("User not found.");
        }
    }
}
