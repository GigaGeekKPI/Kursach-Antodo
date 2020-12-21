import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task/task.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from './task.service';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SearchComponent } from './search/search.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';



@NgModule({
  declarations: [TaskDashboardComponent, TaskComponent, ModalDialogComponent, DeleteDialogComponent, SearchComponent, TaskFilterComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [TaskService]
})
export class TaskModule { }
