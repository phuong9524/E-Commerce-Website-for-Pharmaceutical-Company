namespace Medicine.DataAccess.Entites
{
    public class OrderDetail : BaseEntity
    {
        public  Guid Id { get; set; }

        public Guid CartId { get; set; }

        public Guid OrderId { get; set; }

        public virtual Cart Cart { get; set; }

        public virtual Order Order { get; set; }
    }
}