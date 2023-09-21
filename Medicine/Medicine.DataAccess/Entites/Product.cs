namespace Medicine.DataAccess.Entites
{
    public class Product : BaseEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public List<string> Images { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public string UserObject { get; set; }

        public string UserGuide { get; set; }

        public string Storage { get; set; }

        public string Use { get; set; }

        public List<string> Materials { get; set; }

        public string Description { get; set; }

        public int NumberOfViews { get; set; }

        public int NumberOfSold { get; set; }

        public Guid TypeId { get; set; }

        public virtual ProductType Type { get; set; }
        
        public virtual IList<Cart> Carts { get; set; }

        public virtual IList<Comment> Comments { get; set; }
    }
}
