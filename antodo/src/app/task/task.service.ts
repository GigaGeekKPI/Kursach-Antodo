import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Filters } from '../utils/Filters';
import { Task } from '../utils/Task';
import { TaskStatus } from '../utils/TaskStatus';

@Injectable()
export class TaskService {
  private taskFilter$: BehaviorSubject<Filters> = new BehaviorSubject<Filters>({ search: '', status: TaskStatus.OPEN });

  constructor(private http: HttpClient) { }

  getTaskFilter(): Filters {
    return this.taskFilter$.getValue();
  }
  setTaskFilter(filters: Filters): void {
    this.taskFilter$.next(filters);
  }

  getAllTasks(): Observable<Task[]> {
    const { search, status } = this.getTaskFilter();

    let params = new HttpParams().set('status', status);
    if (search) {
      params = new HttpParams()
        .set('search', search)
        .set('status', status);
    }
    return this.http.get<Task[]>(`${environment.baseURL}/tasks`, { params });
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${environment.baseURL}/tasks`, task);
  }

  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${environment.baseURL}/tasks/${id}`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${environment.baseURL}/tasks`, task);
  }

  updateTaskStatus(status: string, id: number): Observable<any> {
    return this.http.patch(`${environment.baseURL}/tasks/${id}/status`, { status: status });
  }

  getByQuery(query: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${environment.baseURL}/tasks?search=${query}`)
  }
}
