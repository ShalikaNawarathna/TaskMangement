import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm!: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
  generateBSONObjectID() {
    const timestamp = new Date().getTime();
    const randomInt = Math.floor(Math.random() * 1000000000);
    const _id = `${timestamp}${randomInt}`;
    return _id;
  }

  ngOnInit(): void {

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Form submitted!', this.taskForm.value);
      this.service.addTask(this.taskForm.value).subscribe(
        (res) => {
          if (res.exists) {
            this.messageService.add({
              key: 'key1',
              severity: 'warn',
              summary: 'Warning',
              detail: 'Task already exists!',
            });
          } else {

            console.log('Response', res);
            this.messageService.add({
              key: 'key1',
              severity: 'success',
              summary: 'Success',
              detail: 'Task added successfully!',
            });
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log('Error adding task', error);
          this.messageService.add({
            key: 'key1',
            severity: 'error',
            summary: 'Failed to add Task',
          });
        }
      );
    }
  }
}
