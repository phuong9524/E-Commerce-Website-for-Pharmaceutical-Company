namespace Medicine.Domain.Exceptions
{
    public class ExistException : Exception
    {
        public ExistException() : base()
        { }

        public ExistException(string message) : base(message) 
        { }
    }
}
