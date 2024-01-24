using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace TaskMangement.Model
{
    public interface ITaskStoreDatabaseSettings
    {
        string TasksDataCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
