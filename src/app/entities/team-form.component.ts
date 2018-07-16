import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "../store/reducer";
import { Store } from "@ngrx/store";
import * as app from "../store/actions/app";
import * as fromReducer from "../store/reducer";
import { Observable } from "rxjs";
import { Team } from "../models/models";

@Component({
  selector: "team-form",
  templateUrl: "./team-form.html",
  styleUrls: ["./entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class TeamFormComponent {
  loading: boolean = false;
  messg: string = null;
  appLoaded$: Observable<boolean>;
  entityForm: FormGroup;
  error$: Observable<string>;
  team$: Observable<Team[]>;

  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.initForm();

    this.team$ = this.store.select(fromReducer.getAllTeamsData);
    this.appLoaded$ = this.store.select(fromReducer.getAppLoaded);
    this.error$ = this.store.select(fromReducer.getAppError);
  }
  initForm() {
    this.entityForm = this.fb.group({
      id: null,
      team: ["", Validators.required],
      initials: [""]
    });
  }

  submit() {
    if (!this.entityForm.valid) {
      return;
    }
    this.loading = true;
    this.team$.take(1).subscribe(t => {
      let i = t.findIndex(
        o => o.Team.toLowerCase() == this.entityForm.value["team"].toLowerCase()
      );
      if (i >= 0) {
        this.messg = "Team already exists.";
        this.loading = false;

        return;
      }
      this.store.dispatch(new app.AddTeam(this.entityForm.value));

      let l$ = this.appLoaded$.subscribe(l => {
        if (l) {
          this.error$.take(1).subscribe(e => {
            setTimeout(() => {
              l$.unsubscribe();

              if (e == null) {
                this.initForm();
                this.messg = "SAVED!";
              } else {
                this.messg = e;
              }
              this.loading = false;
            }, 1000);
          });
        }
      });
    });
  }
}
