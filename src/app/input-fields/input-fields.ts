import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MethodType, User } from '../types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-fields',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './input-fields.html',
  styleUrl: './input-fields.css'
})
export class InputFields {
  @Input() method: MethodType = MethodType.None;
  @Output() userChange = new EventEmitter<User>();

  name = "";
  email = "";
  password = "";
  id = "";
  async onCreate() {
    if (!this.name || !this.email || !this.password) {
      alert(`Please fill all fields when creating a user.`);
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password
        })
      });

      if (!response.ok) {
        const error = await response.json()
        throw error.detail[0]
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error(error)
    }
    this.resetForm();
  }

  async onGet() {
    if (!this.id) return;
    try {
      const response = await fetch(`http://localhost:8000/users/${this.id}`);
      if (!response.ok) {
        const error = await response.json()
        throw error.detail[0]
      }

      const user = await response.json();
      this.userChange.emit(user);
      console.log(user);

    } catch (error) {
      console.error(error)
    }
    this.resetForm();
  }

  async onUpdate() {
    if (!this.id || !this.name || !this.email || !this.password) {
      alert(`Please fill all fields to update user.`);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/users/${this.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: this.name,
          email: this.email,
          password: this.password
        })
      });

      if (!response.ok) {
        const error = await response.json()
        throw error.detail[0]
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error(error)
    }
    this.resetForm();
  }

  async onDelete() {
    if (!this.id) {
      alert(`Please enter an ID to delete a user.`);
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/users/${this.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        const error = await response.json()
        throw error.detail[0]
      }

      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error(error)
    }
    this.resetForm();
  }

  resetForm() {
    this.name = "";
    this.email = "";
    this.password = "";
    this.id = "";
  }
}
