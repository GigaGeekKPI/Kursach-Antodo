import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Filters } from 'src/app/utils/Filters';
import { TaskStatus } from 'src/app/utils/TaskStatus';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit, OnDestroy {
  @Input() filters: Filters;

  @Output() filterChange: EventEmitter<Filters> = new EventEmitter<Filters>();

  statuses: string[] = Object.values(TaskStatus);
  taskFilter: FormGroup;
  destroy$: Subject<void> = new Subject<void>();

  statusClasses = {
    open: true,
    inProgress: false,
    done: false
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.handleFiltersChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.taskFilter = this.fb.group({
      search: [this.filters.search],
      status: [this.filters.status]
    })
  }

  handleFiltersChange(): void {
    this.taskFilter.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => this.filterChange.emit(val));
  }

}
