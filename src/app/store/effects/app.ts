import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import * as appData from "../actions/app";
import { APIService } from "../../services/api.service";
import * as config from "../../config/api";
import { Action } from "@ngrx/store";
@Injectable()
export class AppEffects {
  @Effect()
  initApp$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_ALL_DATA)

    .switchMap(() => {
      let loc = this.apiService.get(config.api.locations);
      let users = this.apiService.get(config.api.users);

      let cat = this.apiService.get(config.api.categories);
      let teams = this.apiService.get(config.api.teams);
      return Observable.forkJoin([loc, users, cat, teams]);

    })
    .mergeMap(results => {
      return Observable.from([
        new appData.LoadLocationsSuccess(results[0]),
        new appData.LoadAllUsersSuccess(results[1]),
        new appData.LoadCategoriesSuccess(results[2]),
        new appData.LoadAllTeamsSuccess(results[3]),
        new appData.LoadAllDataSuccess(),
      ]);
    })
    .catch(e => {
      return Observable.from([new appData.LoadFail(e)]);
    });

  @Effect()
  loadUser$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_USER_DATA)
    .switchMap(() => {
      const id = sessionStorage.getItem("userID");
      return this.apiService.get(`${config.api.users}/${id}`);
    })
    .map(res => {
      return new appData.LoadUserSuccess(res);
    })
    .catch(e => {
      return Observable.from([new appData.LoadFail(e)]);
    });

  @Effect()
  loadLocations$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_LOCATIONS_DATA)
    .switchMap(() => {
      return this.apiService.get(`${config.api.locations}`);
    })
    .map(res => {
      console.log(res);
      return new appData.LoadLocationsSuccess(res);
    })
    .catch(e => {
      console.log(e);
      return Observable.from([new appData.LoadFail(e)]);
    });

  @Effect()
  loadUsers$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_ALL_USERS)
    .switchMap((req: appData.LoadAllUsers) => {
      let url =
        req.payload != null
          ? `${config.api.usersByTeam}/${req.payload}`
          : config.api.users;

      return this.apiService.get(url);
    })
    .map(res => {
      console.log(res);

      return new appData.LoadAllUsersSuccess(res);
    })
    .catch(e => {
      return Observable.from([new appData.LoadFail(e)]);
    });

  @Effect()
  loadTeams$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_TEAMS)
    .switchMap(() => {
      return this.apiService.get(`${config.api.teams}`);
    })
    .map(res => {
      console.log(res);
      return new appData.LoadAllTeamsSuccess(res);
    })
    .catch(e => {
      return Observable.from([new appData.LoadFail(e)]);
    });
  @Effect()
  loadCat$: Observable<Action> = this.actions$
    .ofType(appData.LOAD_CATEGORIES)
    .switchMap(() => {
      return this.apiService.get(`${config.api.categories}`);
    })
    .map(res => {
      return new appData.LoadCategoriesSuccess(res);
    })
    .catch(e => {
      return Observable.from([new appData.LoadFail(e)]);
    });

  @Effect()
  addCat$: Observable<Action> = this.actions$
    .ofType(appData.ADD_CATEGORY)
    .switchMap((req: appData.AddCategory) => {
      return this.apiService
        .post(`${config.api.categories}`, req.payload)
        .map(res => {
          return new appData.AddCategorySuccess(res);
        })
        .catch(e => {
          return Observable.from([new appData.LoadFail(e)]);
        });
    });

  @Effect()
  addLoc$: Observable<Action> = this.actions$
    .ofType(appData.ADD_LOCATION)
    .switchMap((req: appData.AddLocation) => {
      return this.apiService
        .post(`${config.api.locations}`, req.payload)
        .map(res => {
          return new appData.AddLocationSuccess(res);
        })
        .catch(e => {
          return Observable.from([new appData.LoadFail(e)]);
        });
    });



    @Effect()
    addUser$: Observable<Action> = this.actions$
      .ofType(appData.ADD_USER)
      .switchMap((req: appData.AddUser) => {
        let res;
        if (!req.payload.ID ) {
          res = this.apiService.post(`${config.api.users}`, req.payload);
        } else {
          res = this.apiService.put(`${config.api.users}`, req.payload);
        }
  
        return res
          .map(res => {
            return new appData.AddUserSuccess(res);
          })
          .catch(e => {
            return Observable.from([new appData.LoadFail(e)]);
          });
      });

      @Effect()
      addTeam$: Observable<Action> = this.actions$
        .ofType(appData.ADD_TEAM)
        .switchMap((req: appData.AddTeam) => {
          return this.apiService
            .post(`${config.api.teams}`, req.payload)
            .map(res => {
              return new appData.AddTeamSuccess(res);
            })
            .catch(e => {
              return Observable.from([new appData.LoadFail(e)]);
            });
        });
  constructor(
    private actions$: Actions,
    private apiService: APIService,
  ) {}
}
