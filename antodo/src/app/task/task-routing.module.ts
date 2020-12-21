import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TaskDashboardComponent 
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TaskRoutingModule { }
