namespace Medicine.DataAccess.Entites
{
    public class Comment : BaseEntity
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public float Points { get; set; }

        public Guid UserId { get; set; }

        public Guid ProductId { get; set; }

        public float Conduct { get; set; }

        public List<string> Images { get; set; }

        public virtual Product Product { get; set; }
    }
}
