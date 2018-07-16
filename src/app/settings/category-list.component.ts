import { Component, Input } from "@angular/core";
import * as fromReducer from "../store/reducer";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";
import { Sort } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { listItemsPerPage } from "../config/common";
import { Team, Category } from "../models/models";
import * as functions from "../functions";

@Component({
  selector: "category-list",
  templateUrl: "./category-list.html"
})
export class CategoryListComponent {
  sort: Sort = { active: "category", direction: "asc" };
  entity: Category[];
  displayedColumns: string[] = ["ID", "Category"];
  currentPage: number = 0;
  pageSize: number = 10;
  dataSource: Team[];
  pageNum: number[] = listItemsPerPage;
  showTeam: boolean = true;
  teamID: number = null;
  @Input()
  set find(event: string) {
    console.log(event);
    this.store
      .select(fromReducer.getAllCategoriesData)
      .take(1)
      .subscribe(p => {
        if (event != "") {
          let s = event.toLowerCase();
          this.entity = p.filter(o => o.Category.toLowerCase().indexOf(s) >= 0);
        } else {
          this.entity = p;
        }
        this.paginate();
      });
  }

  constructor(private store: Store<State>) {
    this.store.dispatch(new app.LoadCategories());
  }

  ngOnInit() {
    this.store.select(fromReducer.getAllCategoriesData).subscribe(res => {
      this.entity = res;
      this.paginate();
    });
  }

  sortData(sort: Sort) {
    if (!sort) {
      return;
    }
    this.sort = sort;
    this.dataSource = functions.sortData(sort, this.entity);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.paginate();
  }

  paginate() {
    this.sortData(this.sort);
    this.dataSource = functions.paginate(
      this.entity,
      this.currentPage,
      this.pageSize
    );
  }
}
