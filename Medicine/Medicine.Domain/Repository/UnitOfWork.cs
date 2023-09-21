using Medicine.DataAccess.Context;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private MedicineContext _db;

        public IUserRepository Users { get; set; }

        public IUserRoleRepository UserRoles { get; set; }

        public IProductRepository Products { get; set; }

        public IProductTypeRepository ProductTypes { get; set; }

        public ICartRepository Carts { get; set; }

        public IOrderRepository Orders { get; set; }

        public IOrderDetailRepository OrderDetails { get; set; }

        public IOrderStatusRepository OrderStatuses { get; set; }

        public IMessageRepository Messages { get; set; }

        public ICommentRepository Comments { get; set; }

        public INewsfeedRepository Newsfeeds { get; set; }

        public IRoleRepository Roles { get; set; }

        private bool isDisposed = false;

        public UnitOfWork(MedicineContext db)
        {
            _db = db;
            Users = new UserRepository(_db);
            UserRoles = new UserRoleRepository(_db);
            Products = new ProductRepository(_db);
            ProductTypes = new ProductTypeRepository(_db);
            Carts = new CartRepository(_db);
            Orders = new OrderRepository(_db);
            OrderDetails = new OrderDetailRepository(_db);
            OrderStatuses = new OrderStatusRepository(_db);
            Messages = new MessageRepository(_db);
            Comments = new CommentRepository(_db);
            Newsfeeds = new NewsfeedRepository(_db);
            Roles = new RoleRepository(_db);
        }

        public void SaveChanges()
        {
            _db.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            // Check to see if Dispose has already been called.
            if (!isDisposed)
            {
                // If disposing equals true, dispose all managed
                // and unmanaged resources.
                if (disposing)
                {
                    // Dispose managed resources.
                    _db.SaveChanges();
                    _db.Dispose();
                }

                // Note disposing has been done.
                isDisposed = true;
            }
        }
    }
}
