namespace Medicine.Domain.Dto.CartDto
{
    public class CartDetailDto : CartResponseDto
    {
        public IList<Carthistory> CartHistories { get; set; }
    }

    public class Carthistory
    {
        public Guid Id { get; set; }

        public DateTime CreatedAt { get; set; }

        public string Description { get; set; }
    }
}
