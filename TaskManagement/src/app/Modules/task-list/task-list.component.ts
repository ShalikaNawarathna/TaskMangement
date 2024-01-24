import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  successMessage!: string | null;
  constructor(
    private service: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  tasks: any[] = [];
  selectedTask: any;
  cols: any[] = [
    { field: 'number', header: 'Number' },
    { field: 'title', header: 'Title' },
    // { field: 'description', header: 'Description' },
    // { field: 'dueDate', header: 'Due Date' },
    { field: 'view', header: 'View' },
    { field: 'actions', header: 'Actions' },
  ];

  ngOnInit() {
    this.getTasks();
    this.successMessage = this.route.snapshot.queryParams['successMessage'];
    if (this.successMessage) {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: this.successMessage,
      });
    }
  }

  getTasks() {
    this.service.getTasks().subscribe(
      (res) => {
        this.tasks = res;
        console.log(this.tasks);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }

  viewTask(title: string) {
    const encodedTitle = encodeURIComponent(title);
    this.router.navigate(['/view-task', encodedTitle]);
  }


  createTask() {
    this.router.navigate(['/create-task']);
  }

  deleteTask(title: string) {
    this.service.deleteTask(title).subscribe(
      () => {
        alert('Task Deleted');
        console.log('Deleted');
        this.getTasks();
        this.messageService.add({
          key: 'key1',
          severity: 'error',
          summary: 'Task deleted successfully!',
        });
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }

  updateTask(title: string) {
    const encodedTitle = encodeURIComponent(title);
    this.router.navigate(['/update-task', encodedTitle]);
  }
}
