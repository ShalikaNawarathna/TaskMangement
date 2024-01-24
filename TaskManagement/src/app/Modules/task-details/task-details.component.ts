import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/Model/task';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {
  task: any;

  constructor(private route: ActivatedRoute, private service: AuthService) {}

  ngOnInit() {
    const encodedTitle = this.route.snapshot.params['title'];
    const decodedTitle = decodeURIComponent(encodedTitle);
    console.log(decodedTitle);
    this.viewTask(decodedTitle);
  }

  viewTask(title: any) {
    this.service.getByTitle(title).subscribe(
      (task) => {
        this.task = task;
        console.log(this.task);
      },
      (error) => {
        console.error('Error fetching task by title ', error);
      }
    );
  }
}
