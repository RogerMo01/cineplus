namespace cineplus.CRDController;

public abstract class CRDController<T> : ControllerBase where T : class
{
    protected readonly DataContext _context;
    public CRDController(DataContext context)
    {
        _context = context;
    }

    public IQueryable<T> GetAll()
    {
        return _context.Set<T>();
    }
    
    public async Task Insert(T entity)
    {
        _context.Set<T>().Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var entity = await _context.Set<T>().FindAsync(id);

        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
    }
}
