import { ActionReducer, MetaReducer, combineReducers } from '@ngrx/store';


import * as fromApp from './app';

import { environment } from "../../../environments/environment"
import { compose} from "@ngrx/core";
import { storeFreeze } from "ngrx-store-freeze";

export interface State {
    app: fromApp.State,

}
export const reducers = {
    app: fromApp.reducer,
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

const developmentReducer: ActionReducer<{}> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}




export const getApp = (state: State) => state;
export const getAppTitle = (state: State) => state.app.title;
export const getAppLoading = (state: State) => state.app.loading;
export const getAppLoaded = (state: State) => state.app.loaded;
export const getAppError = (state: State) => state.app.error;
export const getSessionUser = (state: State) => state.app.user;
export const getSessionUserIsAdmin = (state: State) => state.app.user.IsAdmin == 1;
export const getLocations = (state: State) => state.app.locations;
export const getLocationsData = (state: State) => state.app.locations.data;
export const getAllUsers = (state: State) => state.app.users;
export const getAllUsersData = (state: State) => state.app.users.data;
export const getAllTeams = (state: State) => state.app.teams;
export const getAllTeamsData = (state: State) => state.app.teams.data;
export const getAllCategories = (state: State) => state.app.categories;
export const getAllCategoriesData = (state: State) => state.app.categories.data;
export const getAllProjects = (state: State) => state.app.projects;
export const getAllProjectsData = (state: State) => state.app.projects.data;
export const getProjectNotes = (state: State) => state.app.notes;
export const getDownloadFile = (state: State) => state.app.downloadFile;


