using Medicine.DataAccess.Context;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class RoleRepository : Repository<Role>, IRoleRepository
    {
        private MedicineContext _medicineContext;

        public RoleRepository(MedicineContext medicineContext) : base(medicineContext)
        {
            _medicineContext = medicineContext;
        }
    }
}
