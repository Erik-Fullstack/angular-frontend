import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonGroup } from './button-group/button-group';
import { InputFields } from './input-fields/input-fields';
import { RenderedWindow } from "./rendered-window/rendered-window";
import {MethodType, User} from './types';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonGroup, InputFields, RenderedWindow],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  method = signal<MethodType>(0);
  singleUser = signal<User | null>(null);
  multipleUsers = signal<User[] | null>(null);

  setMethod(signal: MethodType) {
    this.method.set(signal)
  }
  setSingleUser(newUser: User) {
    this.multipleUsers.set(null)
    this.singleUser.set(newUser)
  }
  setMultipleUsers(newUsers: User[]) {
    this.singleUser.set(null)
    this.multipleUsers.set(newUsers)
  }
  setAllToNull() {
    this.method.set(0);
    this.singleUser.set(null);
    this.multipleUsers.set(null);
  }
}
