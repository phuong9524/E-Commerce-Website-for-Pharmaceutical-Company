namespace Medicine.DataAccess.Entites
{
    public class OrderStatus : BaseEntity
    {
        public Guid Id { get; set; }

        public string? Description { get; set; }

        public string Status { get; set; }

        public Guid OrderId { get; set; }

        public virtual Order Order { get; set; }
    }
}
