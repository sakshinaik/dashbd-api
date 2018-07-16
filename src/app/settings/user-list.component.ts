import { Component, ViewChild, Input } from "@angular/core";
import * as fromReducer from "../store/reducer";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";
import { Sort, MatSort } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { listItemsPerPage } from "../config/common";
import { User } from "../models/models";
import * as functions from "../functions";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.html"
})
export class UserListComponent {
  @ViewChild(MatSort) sort: MatSort;
  @Input() find: Observable<string> = Observable.empty();
  users: User[];
  displayedColumns: string[] = ["ID", "Firstname", "Email", "Team"];
  currentPage: number = 0;
  pageSize: number = 10;
  dataSource: User[];
  pageNum: number[] = listItemsPerPage;
  showTeam: boolean = true;
  teamID: number = null;
  constructor(private store: Store<State>) {
    this.store.dispatch(new app.LoadAllUsers(this.teamID));

  }

  ngOnInit() {
    this.store.select(fromReducer.getSessionUser).take(1).subscribe(res => {
      if (res.IsAdmin == 1) {
        this.displayedColumns.push("Team");
        this.showTeam = true;
      } else {
        this.teamID = res.TeamID;

        this.store.select(fromReducer.getAppTitle)
          .take(1)
          .subscribe(title => {
            setTimeout(() => {
              this.store.dispatch(
                new app.SetTitle(title + " (" + res.Team.Team + ")")
              );
            }, 0);
          });
      }

    });
    this.store.select(fromReducer.getAllUsers).subscribe(res => {
      if (res.hasOwnProperty("data")) {
        this.users = res.data;
        this.paginate();
      }
    });

    this.find.subscribe(txt => {
      console.log(txt);
    });
  }

  sortData(sort: Sort) {
    this.dataSource = functions.sortData(sort, this.users);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.paginate();
  }

  paginate() {
    this.dataSource = functions.paginate(
      this.users,
      this.currentPage,
      this.pageSize
    );

  }
}
