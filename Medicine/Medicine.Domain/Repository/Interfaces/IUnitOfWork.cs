namespace Medicine.Domain.Repository.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }

        IUserRoleRepository UserRoles { get; }

        IProductRepository Products { get; }

        IProductTypeRepository ProductTypes { get; }

        ICartRepository Carts { get; }

        IOrderRepository Orders { get; }

        IOrderDetailRepository OrderDetails { get; }

        IOrderStatusRepository OrderStatuses { get; }

        IMessageRepository Messages { get; }

        ICommentRepository Comments { get; }

        INewsfeedRepository Newsfeeds { get; }

        IRoleRepository Roles { get; }

        void SaveChanges();
    }
}
