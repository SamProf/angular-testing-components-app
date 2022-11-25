import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirstService} from "../../services/first.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[
    FirstService
  ]
})
export class LoginComponent implements OnInit {


  @Input()
  user?: User;

  @Output()
  logoutEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private firstService: FirstService) {
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
}


export interface User {
  name?: string;
  family?: string;
}
