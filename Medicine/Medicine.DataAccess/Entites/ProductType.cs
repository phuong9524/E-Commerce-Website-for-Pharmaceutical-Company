namespace Medicine.DataAccess.Entites
{
    public class ProductType : BaseEntity
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public virtual IList<Product> Products { get; set; }
    }
}
