import { Component } from '@angular/core';
import {MenuListComponent} from "./menu-list/menu-list.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenuListComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
