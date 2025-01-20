import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {MenuModel} from "../../../../models/menu.model";
import {MenuService} from "../../../../services/menu.service";
import {IncludeQPModel} from "../../../../models/params/include-qp.model";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {NgForOf} from "@angular/common";
import moment from "moment";

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit, OnDestroy {

  private sub: Subscription = new Subscription();
  menus: MenuModel[] = [];
  includeQP: IncludeQPModel;

  constructor(
    private menuService: MenuService,
    private snackbar: SnackbarService
  ) {
    this.includeQP = {
      menuItems: true,
      foods: true
    }
  }

  ngOnInit(): void {
    this.loadAllMenus();
  }

  loadAllMenus(): void {
    this.sub.add(
      this.menuService.getAll(this.includeQP).subscribe({
        next: (res) => {
          this.menus = res;
          console.log(this.menus);
        },
        error: (err) => {
          this.snackbar.error(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected readonly moment = moment;
}
