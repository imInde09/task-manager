import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiBaseUrl = 'http://127.0.0.1:5000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiBaseUrl);
  }

  addTask(task: { title: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiBaseUrl, task, { headers });
  }

  updateTask(taskId: number, updatedTask: { done: boolean }): Observable<any> {
    const url = `${this.apiBaseUrl}/${taskId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(url, updatedTask, { headers });
  }

  deleteTask(taskId: number): Observable<any> {
    const url = `${this.apiBaseUrl}/${taskId}`;
    return this.http.delete(url);
  }
}
