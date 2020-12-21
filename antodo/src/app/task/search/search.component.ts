import { Component, forwardRef, OnInit, } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true
  }]
})
export class SearchComponent implements OnInit, ControlValueAccessor {
  searchInput: FormControl = new FormControl('');

  writeValue(val: string): void {
    this.searchInput.setValue(val);
    this.handleChange(val);
  }

  registerOnChange(fn: (val: string) => void): void {
    this.handleChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.handleTouched = fn
  }


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.handleSearchInputChanges();
  }


  handleTouched(): void { }

  handleChange(val: string): void { }

  private handleSearchInputChanges(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      ).subscribe(val => this.writeValue(val));
  }
}