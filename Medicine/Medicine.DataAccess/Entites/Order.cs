namespace Medicine.DataAccess.Entites
{
    public class Order : BaseEntity
    {
        public Guid Id { get; set; }

        public int MerchandiseSubtotal { get; set; }

        public string PaymentMethod { get; set; }

        public string Destination { get; set; }

        public string Description { get; set; }

        public Guid ShipperId { get; set; }

        public Guid UserId { get; set; }

        public virtual IList<OrderDetail>? Details { get; set; }

        public virtual IList<OrderStatus>? Statuses { get; set; }
    }
}
