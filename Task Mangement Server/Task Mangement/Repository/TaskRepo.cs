using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using TaskMangement.Model;
using TaskMangement.Repository;

namespace TaskMangement.Repository
{
    public class TaskRepo : ITaskRepo
    {
        private readonly IMongoCollection<Tasks> _collection;
        private readonly IOptions<TaskStoreDatabaseSettings> _dbSettings;

        public TaskRepo(IMongoClient mongoClient, ITaskStoreDatabaseSettings taskStoreDatabaseSettings, IOptions<TaskStoreDatabaseSettings> dbSettings)
        {/*
            MongoClient client = new MongoClient("mongodb+srv://Shalu:Shalu97@cluster0.385pmak.mongodb.net/?retryWrites=true&w=majority");
            var database = client.GetDatabase("TaskManagement");
            var list = database.ListCollections().ToList();
            _collection = database.GetCollection<Tasks>("Tasks");
            _dbSettings = dbSettings;
            */

            var database = mongoClient.GetDatabase(taskStoreDatabaseSettings.DatabaseName);
            _collection = database.GetCollection<Tasks>(taskStoreDatabaseSettings.TasksDataCollectionName);
            _dbSettings = dbSettings;
        }

        public async Task<List<Model.Tasks>> Get()
        {
            var getUsers = await _collection.Find(task => true).ToListAsync();
            return getUsers;
        }


        public async Task<Tasks> GetByTitle(string title)
        {
            var getTask = await _collection.Find(task => task.Title == title).FirstOrDefaultAsync();
            if(getTask == null)
            {
                throw new ArgumentNullException(nameof(getTask));
            }
            return getTask;
        }
        public async Task<Model.Tasks> Create(Tasks task)
        {
            var existingTask = await _collection.Find(t => t.Title == task.Title).FirstOrDefaultAsync();
            if(existingTask == null)
            {

                await _collection.InsertOneAsync(task);
                return task;

            }
            existingTask.Title = "Exits";
            return existingTask;

           
        }

        public async Task<Tasks> Update(Tasks task)
        {
            var updateTask = Builders<Tasks>.Filter.Eq(t => t.Title, task.Title);
            var update = Builders<Tasks>.Update
                .Set(t => t.Title, task.Title)
                .Set(t => t.Description, task.Description)
                .Set(t => t.DueDate, DateTime.UtcNow);

            var isUpdated = new FindOneAndUpdateOptions<Tasks>
            {
                ReturnDocument = ReturnDocument.After
            };

            return await _collection.FindOneAndUpdateAsync(updateTask, update, isUpdated);

        }

        public async Task Delete(string title)
        {
            try
            {
                var deletingTask = Builders<Tasks>.Filter.Eq("Title", title);
                await _collection.DeleteOneAsync(deletingTask);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
