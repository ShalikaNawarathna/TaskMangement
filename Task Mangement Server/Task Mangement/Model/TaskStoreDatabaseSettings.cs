﻿namespace TaskMangement.Model
{
    public class TaskStoreDatabaseSettings : ITaskStoreDatabaseSettings
    {
        public string TasksDataCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}
