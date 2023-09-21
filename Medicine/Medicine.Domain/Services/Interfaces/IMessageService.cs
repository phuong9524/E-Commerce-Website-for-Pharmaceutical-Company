using Medicine.Domain.Dto.MessageDto;

namespace Medicine.Domain.Services.Interfaces
{
    public interface IMessageService
    {
        IList<string> GetMessage(GetMessageDto getMessageDto);

        Guid SendMessage(SendMessageDto sendMessageDto);
    }
}
