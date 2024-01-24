import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Task } from '../Model/task';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  baseUrl = 'https://localhost:44337/api';

  getTasks() {
    var url = `${this.baseUrl}/Task`;
    return this.http.get<any>(url);
  }

  getByTitle(title: string) {
    const url = `${this.baseUrl}/Task/${title}`;
    // const url = `${this.baseUrl}/Task/getByTitle?title=${encodeURIComponent(
    //   title
    // )}`;
    //const url = 'https://localhost:44337/api/Task/Task1';
    return this.http.get<any>(url);
  }

  addTask(task: Task) {
    const url = `${this.baseUrl}/Task/createTask/`;
    return this.http.post<any>(url, task);
  }

  deleteTask(title: string) {
    const url = `${this.baseUrl}/Task/deleteUser/${title}`;
    return this.http.delete<any>(url);
  }

  updateTask(task: Task, title: string) {
    const url = `${this.baseUrl}/Task/updateTask/${title}`;
    return this.http.put<any>(url, task);
  }
}
