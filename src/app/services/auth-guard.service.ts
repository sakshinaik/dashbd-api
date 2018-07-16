
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as app from "../store/actions/app";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( public store: Store<State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loggedIn()
      .map(r => {
        return true;
      })
      .catch(this.expired);
  }

  loggedIn() : Observable<boolean>{
    if (!sessionStorage.getItem("username")) {
      return Observable.throw(false);
    }

    return Observable.of(true);
  }

   logout():void {
    this.store.dispatch(new app.ResetApp());

    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/");

  }

  expired() : Observable<boolean>{

    sessionStorage.clear();
    localStorage.clear();
    window.location.replace("/");
    return Observable.of(false);
  }
}
