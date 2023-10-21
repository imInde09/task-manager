import { Component , OnInit} from '@angular/core';
import { TaskService } from './task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTaskTitle = '';

  constructor(private TaskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.TaskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addTask() {
    if (this.newTaskTitle) {
      this.TaskService.addTask({ title: this.newTaskTitle }).subscribe(() => {
        this.newTaskTitle = '';
        this.loadTasks();
      });
    }
  }

  updateTask(taskId: number, done: boolean) {
    this.TaskService.updateTask(taskId, { done }).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(taskId: number) {
    this.TaskService.deleteTask(taskId).subscribe(() => {
      this.loadTasks();
    });
  }
}
