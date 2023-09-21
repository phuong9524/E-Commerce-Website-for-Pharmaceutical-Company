namespace Medicine.Domain.Dto
{
    public class ContextDto
    {
        public Guid UserId { get; set; }

        public string UserName { get; set; }

        public string UserEmail { get; set; }

        public string UserFullName { get; set; }

        public IList<string> UserRoles { get; set; }
    }
}
