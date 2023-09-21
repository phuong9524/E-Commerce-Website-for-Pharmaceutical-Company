namespace Medicine.DataAccess.Entites
{
    public class UserRole : BaseEntity
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Role { get; set; }

        public virtual User User { get; set; }
    }
}
