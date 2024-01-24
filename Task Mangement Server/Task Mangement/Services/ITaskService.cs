using TaskMangement.Model;

namespace TaskMangement.Services
{
    public interface ITaskService
    {
        Task<List<Tasks>> Get();

        Task<Tasks> GetByTitle(string title);
        Task<Tasks> Create(Tasks task);

        Task<Tasks> Update(Tasks task);

        Task Remove(string title);
    }
}
