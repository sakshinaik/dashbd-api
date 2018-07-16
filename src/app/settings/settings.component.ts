import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";
import * as fromReducer from "../store/reducer";
import { User } from "../models/models";
import { Observable, Subject } from "rxjs";
import { MatDialog } from "@angular/material";
import { CategoryFormComponent } from "../entities/category-form.component";
import { LocationFormComponent } from "../entities/location-form.component";
import { Router } from "@angular/router";
import { UserFormComponent } from "../entities/user-form.component";
import { TeamFormComponent } from "../entities/team-form.component";

@Component({
  selector: "entity-settings",
  templateUrl: "./settings.html",
  styleUrls: ["./settings.css"],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent {
  @Output() clkLogout: EventEmitter<boolean> = new EventEmitter();
  searchString: string = "";
  search = new Subject<string>();

  user: User = null;
  loading$: Observable<boolean>;
  entity: string = null;
  title: string = "Settings";

  constructor(
    private store: Store<State>,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.store.dispatch(new app.SetTitle(this.title));

    this.loading$ = this.store.select(fromReducer.getAppLoading);

    this.search
    .distinctUntilChanged()
    .debounceTime(500)
    .switchMap(event => {
      if (event != "") {
        this.searchString = event;
        console.log(event)
      }
      return event;
    })
    .subscribe();
  }

  ngAfterViewInit() {
    

  }
  searchTxt(event) {
    this.search.next(event.target.value);
  }
  select(entity: string) {
    this.refreshEntity(entity);

    this.store.dispatch(
      new app.SetTitle(this.title + ": " + entity.toUpperCase())
    );
  }

  add() {
    if (this.entity == null) {
      return;
    }
    let comp;

    switch (this.entity) {
      case "categories":
        comp = CategoryFormComponent;
        break;
      case "locations":
        comp = LocationFormComponent;
        break;
      case "projects":
        this.router.navigate(["/projects"]);
        return;
      case "users":
        comp = UserFormComponent;
        break;
      case "teams":
        comp = TeamFormComponent;
        break;
      default:
        return;
    }
    this.dialog.open(comp, {
      width: "30rem"
    });
  }

  refreshEntity(entity: string) {
    this.entity = null;
    setTimeout(() => {
      this.entity = entity;
    }, 10);
  }
}
