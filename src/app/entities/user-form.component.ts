import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "../store/reducer";
import { Store } from "@ngrx/store";
import * as app from "../store/actions/app";
import * as fromReducer from "../store/reducer";
import { MatDialogRef } from "@angular/material";
import { Observable } from "rxjs";
import { Team, User } from "../models/models";

@Component({
  selector: "user-form",
  templateUrl: "./user-form.html",
  styleUrls: ["./entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent {
  loading: boolean = false;
  messg: string = null;
  appLoaded$: Observable<boolean>;
  entityForm: FormGroup;
  error$: Observable<string>;
  teams$: Observable<Team[]>;
  updateID: number;
  user: User;
  constructor(
    public thisDialogRef: MatDialogRef<UserFormComponent>,
    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.initForm();

    this.appLoaded$ = this.store.select(fromReducer.getAppLoaded);
    this.error$ = this.store.select(fromReducer.getAppError);
    this.store.dispatch(new app.LoadAllTeams());
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.teams$ = this.store.select(fromReducer.getAllTeamsData);
    if (this.updateID) {
      this.store
        .select(fromReducer.getSessionUser)
        .take(1)
        .subscribe(u => {
          this.user = u;

          this.initForm();
        });
    }
  }
  initForm() {
    this.entityForm = this.fb.group({
      id: this.updateID || 0,
      username: [this.user ? this.user.Username : "", Validators.required],
      firstname: [this.user ? this.user.Firstname : "", Validators.required],
      lastname: [this.user ? this.user.Lastname : "", Validators.required],
      email: this.user ? this.user.Email : "",
      teamID: [this.user ? this.user.TeamID : "", Validators.required],
      isAdmin: 1
    });
  }

  submit() {
    if (!this.entityForm.valid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new app.AddUser(this.entityForm.value));

    let l$ = this.appLoaded$.subscribe(l => {
      if (l) {
        this.error$.subscribe(e => {
          setTimeout(() => {
            l$.unsubscribe();

            if (e == null) {
              this.thisDialogRef.close();
              return;
            } else {
              this.messg = e +" username already exists."
            }
            this.loading = false;
          }, 1000);
        });
      }
    });
  }
}
