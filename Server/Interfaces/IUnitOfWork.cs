namespace Server.Interfaces
{
    public interface IUnitOfWork
    {
        ISupplierRepository Supplier { get; }
        void Save();
    }
}
