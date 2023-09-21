using Medicine.DataAccess.Entites;
using Medicine.Domain.Dto.MessageDto;
using Medicine.Domain.Repository.Interfaces;
using Medicine.Domain.Services.Interfaces;

namespace Medicine.Domain.Services
{
    public class MessageService : IMessageService
    {
        private readonly IUnitOfWork _db;

        public MessageService(IUnitOfWork db)
        {
            _db = db;
        }

        public IList<string> GetMessage(GetMessageDto getMessageDto)
        {
            var result = _db.Messages.GetAll(true)
                            .Where(m => m.SenderId == getMessageDto.SenderId && m.ReceiverId == getMessageDto.ReceiverId)
                            .OrderByDescending(m => m.CreatedAt)
                            .Skip(getMessageDto.NumberOfSkips)
                            .Take(10)
                            .Select(m => m.Content)
                            .ToList();

            return result;
        }

        public Guid SendMessage(SendMessageDto sendMessageDto)
        {
            var message = new Message
            {
                Content = sendMessageDto.Content,
                SenderId = sendMessageDto.SenderId,
                ReceiverId = sendMessageDto.ReceiverId,
            };

            _db.Messages.Add(message);
            _db.SaveChanges();

            return message.Id;
        }
    }
}
