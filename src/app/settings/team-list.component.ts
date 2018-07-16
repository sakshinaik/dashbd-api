import { Component, ViewChild, Input } from "@angular/core";
import * as fromReducer from "../store/reducer";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";
import { Sort } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { listItemsPerPage } from "../config/common";
import {  Team } from "../models/models";
import * as functions from "../functions";

@Component({
  selector: "team-list",
  templateUrl: "./team-list.html"
})
export class TeamListComponent {
  @Input() find: Observable<string> = Observable.empty();
  entity: Team[];
  displayedColumns: string[] = ["ID", "Team", "Initials"];
  currentPage: number = 0;
  pageSize: number = 10;
  dataSource: Team[];
  pageNum: number[] = listItemsPerPage;
  showTeam: boolean = true;
  teamID: number = null;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new app.LoadAllTeams());
  

    this.store.select(fromReducer.getAllTeams).subscribe(res => {
      if (res.hasOwnProperty("data")) {
        this.entity = res.data;
        this.paginate();
      }
    });
  }

  sortData(sort: Sort) {
    this.dataSource = functions.sortData(sort, this.entity);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.paginate();
  }

  paginate() {
    this.dataSource = functions.paginate(
      this.entity,
      this.currentPage,
      this.pageSize
    );
  }
}
