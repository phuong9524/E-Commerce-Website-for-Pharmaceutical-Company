namespace Medicine.Domain.Repository.Interfaces
{
    public interface IRepository<T> where T : class
    {
        T Get(Guid id);

        IQueryable<T> GetAll();

        IQueryable<T> GetAll(bool isUntrackEntities);

        void Add(T entity);

        void AddRange(IList<T> entities);

        void Remove(T entity);

        void RemoveRange(IEnumerable<T> entities);

        void Update(T entity);

        void UpdateRange(IList<T> entities);
    }
}
