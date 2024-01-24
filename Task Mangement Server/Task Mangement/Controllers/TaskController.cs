using Microsoft.AspNetCore.Mvc;
using TaskMangement.Services;
using TaskMangement.Model;
using System.Net;

namespace TaskMangement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {

        private readonly ITaskService taskService;

        public TaskController(ITaskService taskService)
        {
            this.taskService = taskService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                List<Tasks> tasks = await taskService.Get();
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }

        [HttpGet("{title}")]
        public async Task<IActionResult> GetByTitle(string? title)
        {
            var decodedTitle = WebUtility.UrlDecode(title);
            var task = await taskService.GetByTitle(decodedTitle);
            if(task == null)
            {
                return NotFound($"Task with title = {title} not found");
            }
            return Ok(task);
        }

        [HttpPost("createTask")]
        public async Task<IActionResult> createTask( Tasks task) 
        {
            try
            {
                var newTask = await taskService.Create(task);
                return Ok(newTask);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateTask/{title}")]
        public async Task<ActionResult> Put(Tasks task, string title)
        {
            try
            {
                var updateTask = await taskService.Update(task);
                return Ok(updateTask);
            }
            catch (Exception ex) 
            {
                return BadRequest($"{ex.Message}");
            }
        }

        [HttpDelete("deleteUser/{title}")]

        public async Task<IActionResult> Delete(string title)
        {
            try
            {
                await taskService.Remove(title);
                return Ok();
            }
            catch(Exception ex) 
            {
            
            return BadRequest(ex.Message);
            
            }
        }
    }
}
