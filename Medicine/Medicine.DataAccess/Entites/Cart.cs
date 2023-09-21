namespace Medicine.DataAccess.Entites
{
    public class Cart : BaseEntity
    {
        public Guid Id { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public bool IsPurchased { get; set; }

        public bool CanComment { get; set; }

        public Guid UserId { get; set; }

        public Guid ProductId { get; set; }

        public virtual User User { get; set; }

        public virtual Product Product { get; set; }

        public virtual OrderDetail OrderDetail { get; set; }
    }
}
