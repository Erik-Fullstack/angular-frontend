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
  @Output() apiOption = new EventEmitter<MethodType>();

  onCreateUserClick() {
    this.apiOption.emit(MethodType.Create);
  }
  onGetUserClick() {
    this.apiOption.emit(MethodType.Read);
  }
  onUpdateUserClick() {
    this.apiOption.emit(MethodType.Update);
  }
  onDeleteUserClick() {
    this.apiOption.emit(MethodType.Delete);
  }
  async onGetAllUsersClick() {
    this.apiOption.emit(MethodType.ReadMany);
    try {
      const response = await fetch(`http://localhost:8000/users/`);
      if (!response.ok) {
        const error = await response.json()
        throw error.detail[0]
      }

      const users = await response.json();
      this.userArr.emit(users)
      console.log(users);

    } catch (error) {
      console.error(error)
    }
  }
}
