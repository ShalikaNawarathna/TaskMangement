import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './Modules/task-list/task-list.component';
import { TaskFormComponent } from './Modules/task-form/task-form.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { TaskDetailsComponent } from './Modules/task-details/task-details.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskUpdateComponent } from './Modules/task-update/task-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTaskComponent } from './Modules/create-task/create-task.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDetailsComponent,
    TaskUpdateComponent,
    CreateTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    MessagesModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    PaginatorModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
