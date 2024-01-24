
using MongoDB.Driver;
using Microsoft.Extensions.Options;

using TaskMangement.Model;
using TaskMangement.Repository;
using TaskMangement.Services;
using TaskMangement.Model;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.Configure<TaskStoreDatabaseSettings>(
                builder.Configuration.GetSection(nameof(TaskStoreDatabaseSettings)));

builder.Services.AddSingleton<ITaskStoreDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<TaskStoreDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
        new MongoClient(builder.Configuration.GetValue<string>("TaskStoreDatabaseSettings:ConnectionString")));
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                      });
});
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<ITaskRepo, TaskRepo>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
