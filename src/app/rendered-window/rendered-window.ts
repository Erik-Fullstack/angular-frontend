import { Component, Input } from '@angular/core';
import { User } from '../types';

@Component({
  selector: 'app-rendered-window',
  imports: [],
  templateUrl: './rendered-window.html',
  styleUrl: './rendered-window.css'
})
export class RenderedWindow {
  @Input() singleUser: User | null = null;
  @Input() multipleUsers: User[] | null = null;
}
