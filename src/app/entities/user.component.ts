import { Component, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../store/reducer";
import * as fromReducer from "../store/reducer";
import { User } from "../models/models";
import { MatDialog, MatDialogRef } from "@angular/material";
import { UserFormComponent } from "./user-form.component";

@Component({
  selector: "user-profile",
  templateUrl: "./user-profile.html",
  styleUrls: ["./entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent {
  @Output() clkLogout: EventEmitter<boolean> = new EventEmitter();
  user: User = null;
  loadUser: boolean = true;
  constructor(private store: Store<State>,
  private dialog: MatDialog
  ) {
    this.store.select(fromReducer.getSessionUser).subscribe(u => {
      this.user = u;
    });

    this.store.select(fromReducer.getAppLoading).subscribe(l => {
      this.loadUser = l;
      if (!l && this.user == null) {
        this.clkLogout.emit();
      }
    });
  }

  openUpdate(){
    let dRef: MatDialogRef<UserFormComponent>;

    dRef = this.dialog.open(UserFormComponent, {
      width: "30rem",
      disableClose: true
    });
    dRef.componentInstance.updateID = this.user.ID;
  }
}
