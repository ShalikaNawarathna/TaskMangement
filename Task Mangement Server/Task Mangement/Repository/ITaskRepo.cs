
using TaskMangement.Model; 
    
namespace TaskMangement.Repository
{
    public interface ITaskRepo
    {
        Task<List<Tasks>> Get();

        Task<Tasks> GetByTitle(string title);
        Task<Tasks> Create(Tasks task);

        Task<Tasks> Update(Tasks task);

        Task Delete(string title);
    }
}
