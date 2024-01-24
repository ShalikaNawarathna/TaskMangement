using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

using System;

namespace TaskMangement.Model
{
    [BsonIgnoreExtraElements]
    public class Tasks
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 

        [BsonElement("title")]
        public string? Title { get; set; }

        [BsonElement("description")]
        public string? Description { get; set; } 

        [BsonElement("dueDate")]
        [BsonDateTimeOptions(Representation = BsonType.DateTime)]
        public DateTime?  DueDate { get; set; }

    }
}
