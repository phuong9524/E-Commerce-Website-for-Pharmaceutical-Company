using Medicine.DataAccess.Context;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class UserRoleRepository : Repository<UserRole>, IUserRoleRepository
    {
        private MedicineContext _medicineContext;

        public UserRoleRepository(MedicineContext medicineContext) : base(medicineContext)
        {
            _medicineContext = medicineContext;
        }
    }
}
