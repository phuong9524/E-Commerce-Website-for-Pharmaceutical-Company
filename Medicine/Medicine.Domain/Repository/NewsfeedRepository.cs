using Medicine.DataAccess.Context;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class NewsfeedRepository : Repository<Newsfeed>, INewsfeedRepository
    {
        private MedicineContext _medicineContext;

        public NewsfeedRepository(MedicineContext medicineContext) : base(medicineContext)
        {
            _medicineContext = medicineContext;
        }
    }
}
