﻿namespace Medicine.Domain.Dto.ManagementDto
{
    public class ModifyUserRequestDto
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }
    }
}
