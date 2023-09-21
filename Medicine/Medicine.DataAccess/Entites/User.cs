namespace Medicine.DataAccess.Entites
{
    public class User : BaseEntity
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PhoneNumber { get; set; }

        public string Address { get; set; }

        public string Avatar { get; set; }

        public DateTime? LastLogIn { get; set; }

        public virtual IList<UserRole> Roles { get; set; }

        public virtual IList<Cart> Carts { get; set; }

        public virtual IList<Message> Messages { get; set; }

        public virtual IList<Newsfeed> Newsfeeds { get; set; }
    }
}
