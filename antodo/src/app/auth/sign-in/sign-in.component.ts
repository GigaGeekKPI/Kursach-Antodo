import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../../utils/User';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;

  get name(): AbstractControl {
    return this.signInForm.get('name');
  }
  get password(): AbstractControl {
    return this.signInForm.get('password');
  }

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.signInForm = this.fb.group({
      name: ['', [
        Validators.required
      ]],
      password: ['',
        Validators.required
      ]
    });
  }

  onSubmit(): void {
    const user: User = {
      username: this.name.value,
      password: this.password.value
    };

    this.authService.signIn(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/tasks']));
  }

}
