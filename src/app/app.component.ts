import { Component, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "./store/reducer";
import * as fromReducer from "./store/reducer";
import * as app from "./store/actions/app";
import { User } from "./models/models";
import { AuthGuard } from "./services/auth-guard.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: string;
  user: User;
  constructor(
    private store: Store<State>,
    private auth: AuthGuard,
    private router: Router
  ) {
    this.store.select(fromReducer.getAppTitle).subscribe(t => {
      this.title = t;
    });
    this.store.dispatch(new app.ResetApp());
    if (sessionStorage.getItem("username")) {
      this.store.dispatch(new app.LoadUser());
    }

    this.store.select(fromReducer.getSessionUser).subscribe(u => {
      this.user = u;
    });
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }
}
