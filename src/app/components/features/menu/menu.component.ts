import {Component} from '@angular/core';
import {MenuPlannerComponent} from "./menu-planner/menu-planner.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MenuListComponent} from "./menu-list/menu-list.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatTabsModule,
    MenuPlannerComponent,
    MenuListComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
