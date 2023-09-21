using Medicine.DataAccess.Context;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class ProductTypeRepository : Repository<ProductType>, IProductTypeRepository
    {
        private MedicineContext _medicineContext;

        public ProductTypeRepository(MedicineContext medicineContext) : base(medicineContext)
        {
            _medicineContext = medicineContext;
        }
    }
}
