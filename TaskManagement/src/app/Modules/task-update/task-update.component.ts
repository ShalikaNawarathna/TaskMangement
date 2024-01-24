import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Task } from 'src/app/Model/task';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss'],
})
export class TaskUpdateComponent {
  taskForm: FormGroup;
  taskId!: string;
  currentUserTitle: string = '';
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }
  // ngOnInit(){
  //   this.currentUserTitle =  this.route.snapshot.params['title'];

  // }

  ngOnInit() {
    const rawTaskId = this.route.snapshot.paramMap.get('title')!;
    this.taskId = decodeURIComponent(rawTaskId);
    console.log('Task ID:', this.taskId);
    this.service.getByTitle(this.taskId).subscribe(
      (task: Task) => {
        console.log('Retrieved Task:', task);
        this.updateUser(task);
      },
      (error) => {
        console.error('Error fetching task data', error);
      }
    );
  }

  updateUser(task: Task) {
    const dueDate = new Date(task.dueDate);
    const formattedDueDate = this.formatDate(dueDate);
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      dueDate: formattedDueDate,
    });
    console.log('Date', dueDate);
    console.log('Form Values before  Update:', this.taskForm.value);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        dueDate: this.taskForm.value.dueDate,
      };

      this.service.updateTask(updatedTask, this.taskId).subscribe(
        (res) => {
          console.log('res', res);
          console.log('Task updated successfully');

          this.messageService.add({
            key: 'key1',
            severity: 'info',
            summary: 'Task Updated successfully',
            detail: 'The task has been successfully updated.',
          });

          this.router.navigate(['/'], {
            queryParams: { successMessage: 'Task updated successfully' },
          });
        },
        (error) => {
          console.error('Error updating task', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error Updating Task',
            detail: 'There was an error updating the task. Please try again.',
          });
        }
      );
    }
  }
  formatDate(date: Date | string): string {
    if (!date) {
      return '';
    }

    const inputDate = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(inputDate.getTime())) {
      return ''; 
    }

    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDate.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
