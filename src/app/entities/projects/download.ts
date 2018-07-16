import { Component, ViewEncapsulation } from "@angular/core";
import { State } from "../../store/reducer";
import { Store } from "@ngrx/store";
import * as app from "../../store/actions/app";
import * as fromReducer from "../../store/reducer";
import { Observable } from "rxjs";

@Component({
  selector: "download-page",
  templateUrl: "./download.html",
  styleUrls: ["../entities.css"],
  encapsulation: ViewEncapsulation.None
})
export class DownloadComponent {
  loading: boolean = false;
  appLoaded$: Observable<boolean>;
  error$: Observable<string>;
  file$: Observable<string>;

  constructor(private store: Store<State>) {
    this.store.dispatch(new app.Download());

    
  }
  ngOnInit(): void {
    setTimeout(() => {
        this.appLoaded$ = this.store.select(fromReducer.getAppLoaded);
        this.error$ = this.store.select(fromReducer.getAppError);


        this.appLoaded$.subscribe(l => {
            if (l) {
              this.file$ = this.store.select(fromReducer.getDownloadFile);
            }
          });

    }, 3000);
    
  }
}
