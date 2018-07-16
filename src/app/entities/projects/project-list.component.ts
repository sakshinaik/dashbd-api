import { Component, Input, ViewEncapsulation } from "@angular/core";
import * as fromReducer from "../../store/reducer";
import { Store } from "@ngrx/store";
import { State } from "../../store/reducer";
import * as app from "../../store/actions/app";
import { Sort, MatDialog, MatDialogRef } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { listItemsPerPage } from "../../config/common";
import { Project } from "../../models/models";
import * as functions from "../../functions";
import { NoteComponent } from "./note.component";
import { NoteListComponent } from "./note-list.component";
import { ProjectFormComponent } from "./project-form.component";
import { Subject } from "rxjs";

@Component({
  selector: "project-list",
  templateUrl: "./project-list.html",
  styleUrls: ["../../settings/settings.css", "./projects.css"],
  encapsulation: ViewEncapsulation.None
})
export class ProjectListComponent {
  @Input() find: Observable<string> = Observable.empty();
  entity: Project[];
  displayedColumns: string[] = [
    "ID",
    "Project",
    "CategoryID",
    "TeamID",
    "Stage",
    "LocationID",
    "EstEndDate",
    "Priority",
    "ScheduleStatus",
    "Update",
    "Notes",
    "Actions"
  ];
  currentPage: number = 0;
  pageSize: number = 10;
  dataSource: Project[];
  pageNum: number[] = listItemsPerPage;
  showTeam: boolean = true;
  teamID: number = null;
  search = new Subject<string>();
  allProjects$: Observable<Project[]>;

  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.store.dispatch(new app.SetTitle("Projects"));

    this.store.dispatch(new app.LoadProjects());

    this.allProjects$ = this.store.select(fromReducer.getAllProjectsData);
  }

  ngOnInit() {
    this.allProjects$.subscribe(res => {
      console.log(res);
      this.entity = res;
      this.paginate();
    });

    this.search
      .distinctUntilChanged()
      .debounceTime(500)
      .switchMap(event => {
        this.allProjects$.take(1).subscribe(p => {
          if (event != "") {
            let s = event.toLowerCase();
            this.entity = p.filter(
              o => o.Project.toLowerCase().indexOf(s) >= 0
            );
          } else {
            this.entity = p;
          }
          this.paginate();

        });

        return event;
      })
      .subscribe();
  }

  addNote(id: number) {
    console.log(id);

    let dRef: MatDialogRef<NoteComponent>;

    dRef = this.dialog.open(NoteComponent, {
      width: "30rem",
      disableClose: true
    });
    dRef.componentInstance.projectID = id;

    dRef.afterClosed().subscribe(() => {
      this.store.dispatch(new app.LoadNotes(id));
    });
  }
  viewNotes(id: number, name: string) {
    let dRef: MatDialogRef<NoteListComponent>;

    dRef = this.dialog.open(NoteListComponent, {
      width: "30rem",
      height: "auto"
    });
    dRef.componentInstance.projectID = id;
    dRef.componentInstance.projectName = name;
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
  openUpdate(id: number) {
    let dRef: MatDialogRef<ProjectFormComponent>;

    dRef = this.dialog.open(ProjectFormComponent, {
      width: "98%"
    });
    dRef.componentInstance.updateID = id;
  }
}
