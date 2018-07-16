import { Component, ViewEncapsulation, Input } from "@angular/core";
import * as fromReducer from "../store/reducer";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";
import { Sort } from "@angular/material";
import { listItemsPerPage } from "../config/common";
import * as functions from "../functions";

@Component({
  selector: "location-list",
  templateUrl: "./location-list.html",
  encapsulation: ViewEncapsulation.None
})
export class LocationListComponent {
  locations: Location[];
  displayedColumns: string[] = ["ID", "Location"];
  currentPage: number = 0;
  pageSize: number = 10;
  dataSource: Location[];

  pageNum: number[] = listItemsPerPage;
  @Input()
  set find(event: string) {
    console.log(event);
    this.store
      .select(fromReducer.getLocationsData)
      .take(1)
      .subscribe(p => {
        if (event != "") {
          let s = event.toLowerCase();
          this.locations = p.filter(
            o => o["Location"].toLowerCase().indexOf(s) >= 0
          );
        } else {
          this.locations = p;
        }
        this.paginate();
      });
  }
  constructor(private store: Store<State>) {
    this.store.dispatch(new app.LoadLocations());
  }

  ngOnInit() {
    this.store.select(fromReducer.getLocationsData).subscribe(l => {
      this.locations = l;
      this.paginate();
    });
  }
  sortData(sort: Sort) {
    this.dataSource = functions.sortData(sort, this.locations);

    console.log(JSON.stringify(this.dataSource));
  }

  compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.paginate();
  }

  paginate() {
    this.dataSource = functions.paginate(
      this.locations,
      this.currentPage,
      this.pageSize
    );
  }
}
