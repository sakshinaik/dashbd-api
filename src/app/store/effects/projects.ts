import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import * as appData from "../actions/app";
import { APIService } from "../../services/api.service";
import * as config from "../../config/api";
import { Action, Store } from "@ngrx/store";
import { State } from "../reducer/app";

@Injectable()
export class ProjectEffects {
  @Effect()
  loadProj$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_PROJECTS)
    .switchMap(() => {
      return this.apiService
        .get(config.api.projects)
        .map(res => {
          return new appData.LoadProjectsSuccess(res);
        })
        .catch(e => {
          return Observable.from([new appData.LoadFail(e)]);
        });
    });

  @Effect()
  addProject$: Observable<Action> = this.actions$
    .ofType(appData.ADD_PROJECT)
    .switchMap((req: appData.AddProject) => {
      let res;
      if (!req.payload.ID ) {
        res = this.apiService.post(`${config.api.projects}`, req.payload);
      } else {
        res = this.apiService.put(`${config.api.projects}`, req.payload);
      }

      return res
        .map(res => {
          return new appData.AddProjectSuccess(res);
        })
        .catch(e => {
      console.log(e);

          return Observable.from([new appData.LoadFail(e)]);
        });
    });

  @Effect()
  addNote$: Observable<Action> = this.actions$
    .ofType(appData.ADD_NOTE)
    .switchMap((req: appData.AddNote) => {
      console.log(req.payload);
      return this.apiService
        .post(`${config.api.addNote}`, req.payload)
        .map(res => {
          return new appData.AddNoteSuccess(res);
        })
        .catch(e => {
          return Observable.from([new appData.LoadFail(e)]);
        });
    });
  @Effect()
  loadNotes$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_NOTE)
    .switchMap((res: appData.LoadNotes) => {
      return this.apiService
        .get(config.api.notes + `/${res.payload}`)
        .map(res => {
          return new appData.LoadNotesSuccess(res);
        })
        .catch(e => {
          return Observable.from([new appData.LoadFail(e)]);
        });
    });

  @Effect()
  delNotes$: Observable<Action> = this.actions$
    .ofType(appData.DELETE_NOTE)
    .switchMap((res: appData.DeleteNote) => {
      return this.apiService
        .delete(config.api.addNote + `/${res.payload}`)
        .map(id => {
          return new appData.DeleteNoteSuccess(id);
        })
        .catch(e => {
          return Observable.from([new appData.LoadFail(e)]);
        });
    });

    @Effect()
      download$: Observable<Action> = this.actions$
        .ofType(appData.DOWNLOAD)
        .switchMap((req: appData.Download) => {
          return this.apiService
            .get(`${config.api.download}`)
            .map((res: string) => {
                console.log(res)
              return new appData.DownloadSuccess(res);
            })
            .catch(e => {
              return Observable.from([new appData.LoadFail(e)]);
            });
        });
  constructor(
    private actions$: Actions,
    private apiService: APIService,
    private store: Store<State>
  ) {}
}
