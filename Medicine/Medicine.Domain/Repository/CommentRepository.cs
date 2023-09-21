using Medicine.DataAccess.Context;
using Medicine.DataAccess.Entites;
using Medicine.Domain.Repository.Interfaces;

namespace Medicine.Domain.Repository
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        private MedicineContext _medicineContext;

        public CommentRepository(MedicineContext medicineContext) : base(medicineContext)
        {
            _medicineContext = medicineContext;
        }
    }
}
