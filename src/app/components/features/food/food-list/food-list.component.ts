import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FoodModel} from "../../../../models/food.model";
import {FoodService} from "../../../../services/food.service";
import {SnackbarService} from "../../../../shared/services/snackbar.service";
import {ActionType} from "../../../../models/enum";
import {ButtonComponent} from "../../../../shared/components/ui-components/button/button.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [
    ButtonComponent,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './food-list.component.html',
  styleUrl: './food-list.component.css'
})
export class FoodListComponent implements OnInit, OnDestroy {
  protected readonly ActionType = ActionType;
  private sub: Subscription = new Subscription();
  displayedColumns: string[] = ['sn', 'name', 'price', 'type', 'action'];
  clickedRows = new Set<FoodModel>();
  foods: FoodModel[] = [];

  constructor(
    private service: FoodService,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.loadFoodData();
  }

  loadFoodData(): void {
    this.sub.add(
      this.service.getAll().subscribe({
        next: (res) => {
          this.foods = res;
        },
        error: (err) => {
          console.log('Error fetching food : ', err);
        }
      })
    );
  }

  toggleClickedRow(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
      return;
    }
    this.clickedRows.add(row);
  }

  deleteFood(id: string): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.snackbarService.success('Food has been deleted');
        this.foods = this.foods.filter(food => food.id !== id);
      },
      error: (err) => {
        console.log('Error deleting food :', err);
      }
    })
  }

  openFoodForm(action_type: string, food?: FoodModel) {
    const dialogRef = this.service.openFoodForm(action_type, food);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action_type == ActionType.NEW) {
          if (food) {
            this.sub.add(
              this.service.create(result).subscribe({
                next: (res) => {
                  this.foods = [...this.foods, res];
                }
              })
            );
          }
          this.foods = [...this.foods, result];
        } else if (action_type == ActionType.EDIT) {
          this.sub.add(
            this.service.update(result).subscribe({
              next: (res) => {
                const index = this.foods.findIndex(c => c.id === result.id);
                if (index !== -1) {
                  Object.assign(this.foods[index], res);
                }
              }
            })
          );
        }
      }
    });
  }

  ngOnDestroy(): void {
  }

}
