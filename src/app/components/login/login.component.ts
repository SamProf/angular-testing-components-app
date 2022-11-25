import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirstService} from "../../services/first.service";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    FirstService
  ]
})
export class LoginComponent implements OnInit {


  @Input()
  user?: User;

  @Output()
  logoutEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  loginEvent: EventEmitter<{ email: string, password: string }> = new EventEmitter<{ email: string, password: string }>();
  form: FormGroup;

  constructor(private firstService: FirstService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  ngOnInit(): void {
    this.firstService.init();
  }

  getFullName() {
    return `${this.user?.name} ${this.user?.family}`;
  }

  logoutClickButton() {
    this.logoutEvent.emit(this.user?.name);
  }

  loginSubmit() {
    if (this.form.valid) {
      this.loginEvent.emit({email: this.form.value.email, password: this.form.value.password});
    }

  }
}


export interface User {
  name?: string;
  family?: string;
}
