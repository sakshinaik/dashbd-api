import { Component, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { State } from "../store/reducer";
import { Store } from "@ngrx/store";
import * as app from "../store/actions/app";
import * as fromReducer from "../store/reducer";
import { Observable } from "rxjs";

@Component({
  selector: "category-form",
  templateUrl: "./category-form.html",
  styleUrls: ["./entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class CategoryFormComponent {
  loading: boolean = false;
  messg: string = null;
  appLoaded$: Observable<boolean>;
  entityForm: FormGroup;
  error$: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>
  ) {
    this.initForm();

    this.appLoaded$ = this.store.select(fromReducer.getAppLoaded);
    this.error$ = this.store.select(fromReducer.getAppError);
  }
  initForm() {
    this.entityForm = this.fb.group({
      id: null,
      category: ["", Validators.required]
    });
  }

  submit() {
    if (!this.entityForm.valid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new app.AddCategory(this.entityForm.value));

    let l$ = this.appLoaded$.subscribe(l => {
      if (l) {
        this.error$.take(1).subscribe(e => {
          setTimeout(() => {
            l$.unsubscribe();

            if (e == null) {
              this.initForm();
              this.messg = "SAVED!";
            } else {
              this.messg =  e;
            }
            this.loading = false;

          }, 1000);
        });
      }
    });
    
  }
}
