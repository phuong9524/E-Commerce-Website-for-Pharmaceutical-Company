namespace Medicine.DataAccess.Entites
{
    public interface IDeletable
    {
        bool IsDeleted { get; set; }

        DateTime? DeletedAt { get; set; }

        string? DeletedBy { get; set; }
    }
}
