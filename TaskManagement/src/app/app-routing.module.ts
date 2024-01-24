import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './Modules/task-list/task-list.component';
import { TaskDetailsComponent } from './Modules/task-details/task-details.component';
import { TaskUpdateComponent } from './Modules/task-update/task-update.component';
import { CreateTaskComponent } from './Modules/create-task/create-task.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'view-task/:title', component: TaskDetailsComponent },
  { path: 'update-task/:title', component: TaskUpdateComponent },
  { path: 'create-task', component: CreateTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
