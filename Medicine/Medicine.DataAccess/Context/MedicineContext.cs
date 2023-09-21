using EntityFrameworkCore.SqlServer.JsonExtention;
using Medicine.DataAccess.Entites;
using Medicine.DataAccess.Extension;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace Medicine.DataAccess.Context
{
    public class MedicineContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MedicineContext(DbContextOptions<MedicineContext> options) : base(options)
        {

        }

        public MedicineContext(DbContextOptions<MedicineContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseJsonFunctions();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserRole>()
                .HasOne<User>(ur => ur.User)
                .WithMany(u => u.Roles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<Product>()
                .HasOne<ProductType>(p => p.Type)
                .WithMany(pt => pt.Products)
                .HasForeignKey(p => p.TypeId);

            modelBuilder.Entity<Cart>()
                .HasOne<User>(c => c.User)
                .WithMany(u => u.Carts)
                .HasForeignKey(c => c.UserId);

            modelBuilder.Entity<Cart>()
                .HasOne<Product>(c => c.Product)
                .WithMany(p => p.Carts)
                .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<Cart>()
                .HasOne<OrderDetail>(c => c.OrderDetail)
                .WithOne(o => o.Cart)
                .HasForeignKey<OrderDetail>(o => o.CartId);

            modelBuilder.Entity<OrderDetail>()
                .HasOne<Order>(od => od.Order)
                .WithMany(o => o.Details)
                .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<OrderStatus>()
                .HasOne<Order>(os => os.Order)
                .WithMany(o => o.Statuses)
                .HasForeignKey(os => os.OrderId);

            modelBuilder.Entity<Comment>()
                .HasOne<Product>(c => c.Product)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.ProductId);

            modelBuilder.Entity<Message>()
                .HasOne<User>(m => m.Sender)
                .WithMany(u => u.Messages)
                .HasForeignKey(m => m.SenderId);

            modelBuilder.Entity<Newsfeed>()
                .HasOne<User>(n => n.User)
                .WithMany(u => u.Newsfeeds)
                .HasForeignKey(m => m.UserId);

            modelBuilder.Entity<Product>().Property(p => p.Images).HasJsonConversion();
            modelBuilder.Entity<Product>().Property(p => p.Materials).HasJsonConversion();
            modelBuilder.Entity<Comment>().Property(c => c.Images).HasJsonConversion();
        }        

        //entities
        public DbSet<User> Users { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<ProductType> ProductTypes { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }

        public DbSet<OrderStatus> OrderStatuses { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<Newsfeed> Newsfeeds { get; set; }

        public DbSet<Role> Roles { get; set; }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            BeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        private void BeforeSaving()
        {
            var entries = ChangeTracker.Entries().ToList();

            foreach (var entry in entries)
            {
                if (entry.Entity is BaseEntity auditableEntity)
                {
                    var now = DateTime.UtcNow;
                    var userEmail = _httpContextAccessor.HttpContext.GetUserEmail();

                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            auditableEntity.UpdatedAt = now;
                            auditableEntity.UpdatedBy = userEmail;
                            break;

                        case EntityState.Added:
                            auditableEntity.CreatedAt = now;
                            auditableEntity.CreatedBy = userEmail;
                            auditableEntity.UpdatedAt = now;
                            auditableEntity.UpdatedBy = userEmail;
                            break;

                        case EntityState.Deleted:
                            auditableEntity.IsDeleted = true;
                            auditableEntity.DeletedAt = now;
                            auditableEntity.DeletedBy = userEmail;
                            break;

                        case EntityState.Detached:
                        case EntityState.Unchanged:
                        default:
                            break;
                    }
                }
            }
        }
    }
}
