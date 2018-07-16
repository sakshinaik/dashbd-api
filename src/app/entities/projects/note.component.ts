import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "../../store/reducer";
import { Store } from "@ngrx/store";
import * as app from "../../store/actions/app";
import * as fromReducer from "../../store/reducer";
import { Observable } from "rxjs";
import { User } from "../../models/models";
import { sqlDate } from "../../functions";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "note-form",
  templateUrl: "./notes-form.html",
  styleUrls: ["../entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class NoteComponent {
  loading: boolean = false;
  messg: string = null;
  appLoaded$: Observable<boolean>;
  entityForm: FormGroup;
  error$: Observable<string>;
  user: User;
  projectID: number;
  constructor(
    public thisDialogRef: MatDialogRef<NoteComponent>,

    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.appLoaded$ = this.store.select(fromReducer.getAppLoaded);
    this.error$ = this.store.select(fromReducer.getAppError);
  }
  ngOnInit(): void {
    console.log(this.projectID);

    this.store.select(fromReducer.getSessionUser).subscribe(u => {
      if (u) {
        this.user = u;
        this.initForm();
      }
    });
  }
  initForm() {
    this.entityForm = this.fb.group({
      id: null,
      note: ["", Validators.required],
      projectID: this.projectID,
      userID: this.user.ID,
      addedOn: sqlDate(new Date().toDateString())
    });
  }

  submit() {
    if (!this.entityForm.valid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new app.AddNote(this.entityForm.value));

    let l$ = this.appLoaded$.subscribe(l => {
      if (l) {
        this.error$.take(1).subscribe(e => {
          setTimeout(() => {
            l$.unsubscribe();

            if (e == null) {
              this.thisDialogRef.close();
            } else {
              this.messg = e;
            }
            this.loading = false;
          }, 1000);
        });
      }
    });
  }
}
