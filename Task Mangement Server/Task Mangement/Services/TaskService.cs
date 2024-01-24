using TaskMangement.Model;
using TaskMangement.Repository;
using TaskMangement.Services;

namespace TaskMangement.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepo _taskRepo;

        public TaskService(ITaskRepo taskRepo)
        {
            _taskRepo = taskRepo;
        }

        public async Task<List<Tasks>> Get()
        {
            return await _taskRepo.Get();
        }

        public async Task<Tasks> GetByTitle(string title)
        {
            return await _taskRepo.GetByTitle(title);
        }

        public async Task<Tasks> Create(Tasks task)
        {
            task.DueDate = DateTime.Now;
            return await _taskRepo.Create(task);
        }

        public async Task<Tasks> Update(Tasks task)
        {
            task.DueDate = DateTime.Now;
            return await _taskRepo.Update(task);
        }

        public async Task Remove(string title)
        {
             await _taskRepo.Delete(title);
        }
    }
}
