import { Component, ViewEncapsulation } from "@angular/core";
import { Category, Team, Project } from "../../models/models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "../../store/reducer";
import { Store } from "@ngrx/store";
import * as app from "../../store/actions/app";
import * as fromReducer from "../../store/reducer";
import { User } from "../../models/models";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { projectStages } from "../../config/common";
import { MatDialog, MatDialogRef } from "@angular/material";
import { CustomDataComponent } from "./custom-data.component";
import { startWith, map, debounceTime } from "rxjs/operators";
import { sqlDate, sqlToLocale } from "../../functions";

@Component({
  selector: "project-form",
  templateUrl: "./project-form.html",
  styleUrls: ["../entities.css", "projects.css"],
  encapsulation: ViewEncapsulation.None
})
export class ProjectFormComponent {
  updateID: number;
  project: Project;
  obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  messg: string;
  mop: boolean = false;
  categories$: Observable<Category[]>;
  locations$: Observable<Location[]>;
  teams$: Observable<Team[]>;
  users$: Observable<User[]>;
  usersList: User[];
  filteredUsers$: Observable<User[]>;
  user: User;
  loading: boolean = false;
  stackholders: Team[] = [];
  priority: number[] = [...Array(10)];
  assigned: User[] = [];
  projectForm: FormGroup;
  stages: string[];
  addError: {
    stackholder: string;
    users: string;
  } = {
    stackholder: "",
    users: ""
  };
  savedStr: string = "SAVED!";

  cnt: number = 0;
  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    public dialog: MatDialog
  ) {
    this.store.dispatch(new app.SetTitle("New Project"));
    this.store.dispatch(new app.LoadAllData());
    this.categories$ = this.store.select(fromReducer.getAllCategoriesData);
    this.locations$ = this.store.select(fromReducer.getLocationsData);
    this.teams$ = this.store.select(fromReducer.getAllTeamsData);
    this.users$ = this.store.select(fromReducer.getAllUsersData);
    this.stages = projectStages;
  }
  ngOnInit(): void {
    let loading$ = this.store.select(fromReducer.getAppLoading).subscribe(l => {
      if (!l) {
        setTimeout(() => {
          loading$.unsubscribe();

          this.users$.subscribe(u => {
            this.usersList = u;
          });

          this.store
            .select(fromReducer.getSessionUser)
            .take(1)
            .subscribe(u => {
              if (u) {
                this.user = u;
                let isFound = false;
                if (this.updateID) {
                  this.store
                    .select(fromReducer.getAllProjectsData)
                    .take(1)
                    .subscribe(data => {
                      let i = data.findIndex(o => o.ID == this.updateID);
                      if (i >= 0) {
                        isFound = true;
                        this.project = data[i];
                        this.initForm(data[i]);
                      }
                    });
                }
                if (!isFound) {
                  this.initForm();
                }
              }
            });
        }, 0);
      }
    });
  }
  initForm(projectData?: Project) {
    let endDate = null;
    if (projectData) {
      console.log(projectData.Category);
      if (projectData.EstEndDate) {
        endDate = sqlToLocale(projectData.EstEndDate);
        console.log(endDate);
      }
      //get assigned users
      let u = JSON.parse(projectData.UserIDs);
      if (u.length) {
        this.users$.take(1).subscribe(userObj => {
          u.forEach(uid => {
            var i = userObj.findIndex(o => o.ID == uid);
            if (i >= 0) {
              this.assigned.push(userObj[i]);
            }
          });
        });
      }

      //get stackholders
      u = JSON.parse(projectData.StackholderIDs);
      if (u.length) {
        this.teams$.take(1).subscribe(teamObj => {
          u.forEach(id => {
            var i = teamObj.findIndex(o => o.ID == id);
            if (i >= 0) {
              this.stackholders.push(teamObj[i]);
            }
          });
        });
      }

      this.mop = projectData.MOP == 1;
    } else {
      this.assigned = [];
      this.stackholders = [];
    }
    this.projectForm = this.fb.group({
      category: projectData ? projectData.CategoryID : "",
      project: [projectData ? projectData.Project : "", Validators.required],
      mop: this.mop,
      users: "",
      team: this.user ? this.user.Team.Team : "",
      location: projectData ? projectData.LocationID : "",
      status: projectData ? projectData.ScheduleStatus : "",
      stage: projectData ? projectData.Stage : "",
      stackholders: "",
      assigned: "",
      vertical: projectData ? projectData.TeamID : this.user.TeamID,
      priority: projectData ? projectData.Priority : "",
      est_end_date: endDate
    });

    this.filteredUsers$ = this.projectForm.controls["users"].valueChanges.pipe(
      debounceTime(500),
      startWith(""),
      map(value => this.filterUsers(value))
    );
  }
  filterUsers(name: string): User[] {
    if (name == null || name.trim() == "") {
      return [];
    }
    return this.usersList.filter(
      o =>
        this.inString(o.Username, name) ||
        this.inString(o.Firstname, name) ||
        this.inString(o.Lastname, name)
    );
  }
  inString(str: string, part: string): boolean {
    return str.toLowerCase().indexOf(part.toLowerCase()) != -1;
  }
  submit() {
    if (!this.projectForm.valid) {
      return;
    }
    this.add("team", true);
    this.add("user", true);

    let form = this.projectForm.value;
    let project: any = {
      ID: this.updateID || 0,
      project: form["project"],
      mop: +form["mop"],
      teamID: +form["vertical"],
      categoryID: +form["category"],
      locationID: +form["location"],
      stackholderIDs: JSON.stringify(this.getIds(this.stackholders, "ID")),
      userIDs: JSON.stringify(this.getIds(this.assigned, "ID")),
      estEndDate: sqlDate(form["est_end_date"]),
      actEndDate: null,
      priority: +form["priority"],
      scheduleStatus: form["status"],
      stage: form["stage"],
      addedOn: null,
      updatedOn: null,
      addedUserID: this.user.ID,
      updatedUserID: this.user.ID
    };

    this.loading = true;
    this.messg = null;

    this.store.dispatch(new app.AddProject(project));

    let l$ = this.store.select(fromReducer.getAppLoaded).subscribe(l => {
      if (l) {
        this.store
          .select(fromReducer.getAppError)
          .take(1)
          .subscribe(e => {
            l$.unsubscribe();

            if (e == null) {
              if (this.updateID) {
                let dialogRef: MatDialogRef<ProjectFormComponent>;

                dialogRef.close();
                return;
              }

              this.initForm();
            }
            this.messg = e || this.savedStr;
            this.loading = false;
          });
      }
    });
  }
  assignUserID(id: number) {
    console.log(id);
    this.projectForm.controls["assigned"].setValue(id);
  }

  getIds(obj: {}[], id: string): number[] {
    let arr = [];
    obj.forEach(o => {
      arr.push(o[id]);
    });

    return arr;
  }
  add(e: string, hideError: boolean = false) {
    switch (e) {
      case "team":
        this.pushToObject(this.stackholders, "stackholders", this.teams$);

        break;
      case "user":
        this.addError.users = "";
        console.log(this.assigned);

        if (this.projectForm.value["assigned"] != "") {
          if (!this.pushToObject(this.assigned, "assigned", this.users$)) {
            this.addError.users = !hideError ? "Invalid" : "";
          } else {
            this.projectForm.controls["users"].setValue("");
          }
        } else if (
          this.projectForm.value["users"] &&
          this.projectForm.value["users"].trim() != ""
        ) {
          this.addError.users = !hideError ? "Invalid" : "";
        }

        break;
    }
  }

  pushToObject(
    modelObj: {}[],
    formParam: string,
    dataArr$: Observable<any>
  ): boolean {
    let indExist = modelObj.findIndex(
      o => o["ID"] == this.projectForm.value[formParam]
    );
    let ind: number;
    if (indExist == -1) {
      dataArr$.take(1).subscribe(v => {
        ind = v.findIndex(o => o["ID"] == this.projectForm.value[formParam]);
        if (ind >= 0) {
          modelObj.push(v[ind]);
          this.projectForm.controls[formParam].setValue("");
        }
      });
      return true;
    }
    return false;
  }
  delete(e: {}[], id: number) {
    let ind = e.findIndex(o => o["ID"] == id);
    if (ind >= 0) {
      e.splice(ind, 1);
    }
  }

  addToObservableArray(array$: Observable<any>, item: any) {
    array$.take(1).subscribe(val => {
      console.log(val);
      const newArr = [...val, item];
      this.obsArray.next(newArr);
    });
  }
  addCustomStage() {
    let dialogRef: MatDialogRef<CustomDataComponent>;

    dialogRef = this.dialog.open(CustomDataComponent, {
      width: "30rem",
      disableClose: true
    });
    let stage = "";
    dialogRef.componentInstance.label = "Stage";
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.hasOwnProperty("data") && res.data.trim() != "") {
        const tmpRes = res.data.toUpperCase();
        const i = this.stages.findIndex(s => s.toUpperCase() == tmpRes);
        if (i == -1) {
          //not found in the list
          this.stages.push(res.data);
          stage = res.data;
        } else {
          stage = this.stages[i];
        }
        this.projectForm.controls["stage"].setValue(stage);
      }
    });
  }
}
