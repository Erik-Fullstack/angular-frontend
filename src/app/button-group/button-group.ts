import { Component, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from "@angular/material/button"
import { MatMenuModule } from "@angular/material/menu"
import { MethodType, User } from '../types';

@Component({
  selector: 'app-button-group',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './button-group.html',
  styleUrl: './button-group.css'
})
export class ButtonGroup {
  @Output() userArr = new EventEmitter<User[]>();
  @Output() menuAction = new EventEmitter<MethodType>();

  onCreateUserClick() {
    this.menuAction.emit(MethodType.Create);
  }
  onGetUserClick() {
    this.menuAction.emit(MethodType.Read);
  }
  onUpdateUserClick() {
    this.menuAction.emit(MethodType.Update);
  }
  onDeleteUserClick() {
    this.menuAction.emit(MethodType.Delete);
  }
  async onGetAllUsersClick() {
    this.menuAction.emit(MethodType.ReadMany);
    try {
      const response = await fetch(`http://localhost:8000/users/`);
      if (!response.ok) throw new Error("Error fetchin users. " + response.status);

      const users = await response.json();
      this.userArr.emit(users)
      console.log(users);

    } catch (error) {
      console.error(error)
    }
  }
}
