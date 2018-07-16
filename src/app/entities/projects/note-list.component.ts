import { Component, Input, ViewEncapsulation } from "@angular/core";
import * as fromReducer from "../../store/reducer";
import { Store } from "@ngrx/store";
import { State } from "../../store/reducer";
import * as app from "../../store/actions/app";
import { Note, User } from "../../models/models";
import { Observable } from "rxjs";

@Component({
  selector: "note-list",
  templateUrl: "./note-list.html",
  styleUrls: ["./projects.css"],
  encapsulation: ViewEncapsulation.None
})
export class NoteListComponent {
  entity: Note[] = [];
  projectID: number;
  projectName: string;
  sessionUser$: Observable<User>;
  loaded$: Observable<boolean>;
  error$: Observable<string>;
  delID: number;
  noNotes: boolean = false;
  constructor(private store: Store<State>) {
    this.sessionUser$ = this.store.select(fromReducer.getSessionUser);
    this.loaded$ = this.store.select(fromReducer.getAppLoaded);
  }

  ngOnInit() {
    this.store.dispatch(new app.LoadNotes(this.projectID));

    console.log(this.projectName);
    this.store.select(fromReducer.getProjectNotes).subscribe(res => {
        console.log(res);
      this.noNotes = res.length == 0 ? true : false;
      this.entity = res || [];
    });
  }
  delete(id: number) {
    this.delID = id;
    this.store.dispatch(new app.DeleteNote(id));
    this.error$ = this.store.select(fromReducer.getAppError);
  }
}
