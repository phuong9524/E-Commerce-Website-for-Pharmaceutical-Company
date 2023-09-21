namespace Medicine.Domain.Dto.ProductDto
{
    public class ProductCreateDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public List<string> Images{ get; set; }

        public string UserObject { get; set; }

        public string UserGuide { get; set; }

        public string Storage { get; set; }

        public string Use { get; set; }

        public List<string> Materials { get; set; }

        public Guid TypeId { get; set; }
    }
}
