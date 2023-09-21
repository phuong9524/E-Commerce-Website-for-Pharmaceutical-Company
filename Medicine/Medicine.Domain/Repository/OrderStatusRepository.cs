using Medicine.DataAccess.Context;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class OrderStatusRepository : Repository<OrderStatus>, IOrderStatusRepository
    {
        private MedicineContext _medicineContext;

        public OrderStatusRepository(MedicineContext medicineContext) : base(medicineContext)
        {
            _medicineContext = medicineContext;
        }
    }
}
