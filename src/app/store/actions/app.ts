import { Action } from "@ngrx/store";
import { Category, User, Project, Note, Team } from "../../models/models";
export const LOAD_TEAMS = "[APP] Load All Teams data";
export const LOAD_TEAMS_SUCCESS = "[APP] Load All Teams Success";
export const LOAD_PROJECTS = "[APP] Load All Projects data";
export const LOAD_PROJECTS_SUCCESS = "[APP] Load All Projects Success";

export const LOAD_ALL_DATA = "[APP] Load All data";
export const LOAD_ALL_DATA_SUCCESS = "[APP] Load All Data Success";
export const LOAD_USER_DATA = "[APP] Load User data";
export const LOAD_USER_SUCCESS = "[APP] Load User data Success";
export const LOAD_LOCATIONS_DATA = "[APP] Load Locations data";
export const LOAD_LOCATIONS_SUCCESS = "[APP] Locations  Success";
export const LOAD_ALL_USERS = "[APP] Load All Users data";
export const LOAD_ALL_USERS_SUCCESS = "[APP] All Users Load  Success";
export const SET_TITLE = "[APP] Set Page Title";
export const LOAD_FAIL = "[APP] Load FAIL";
export const RESET_APP = "[APP] RESET App";
export const LOAD_CATEGORIES = "[APP] Load Categories";
export const LOAD_CATEGORIES_SUCCESS = "[APP] Load Categories Success";
export const ADD_CATEGORY = "[APP] Add Category";
export const ADD_CATEGORY_SUCCESS = "[APP] Add Category Success";
export const ADD_LOCATION = "[APP] Add Location";
export const ADD_LOCATION_SUCCESS = "[APP] Add Location Success";
export const ADD_USER = "[APP] Add User";
export const ADD_USER_SUCCESS = "[APP] Add User Success";
export const ADD_PROJECT = "[APP] Add Project";
export const ADD_PROJECT_SUCCESS = "[APP] Add Project Success";
export const ADD_NOTE = "[APP] Add NOTE";
export const ADD_NOTE_SUCCESS = "[APP] Add NOTE Success";
export const LOAD_NOTE = "[APP] Load NOTE";
export const LOAD_NOTE_SUCCESS = "[APP] Load NOTE Success";
export const DELETE_NOTE = "[APP] Delete NOTE";
export const DELETE_NOTE_SUCCESS = "[APP] Delete NOTE Success";
export const ADD_TEAM = "[APP] Add Team ";
export const ADD_TEAM_SUCCESS = "[APP] Add Team Success";
export const DOWNLOAD = "[APP] Download ";
export const DOWNLOAD_SUCCESS = "[APP] Download Success";

export class SetTitle implements Action {
  public readonly type = SET_TITLE;
  constructor(public payload: string) {}
}
export class LoadAllData implements Action {
  public readonly type = LOAD_ALL_DATA;
}
export class LoadAllDataSuccess implements Action {
  public readonly type = LOAD_ALL_DATA_SUCCESS;
}
export class LoadUser implements Action {
  public readonly type = LOAD_USER_DATA;
}
export class LoadUserSuccess implements Action {
  public readonly type = LOAD_USER_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadFail implements Action {
  public readonly type = LOAD_FAIL;
  constructor(public payload: any) {}
}

export class ResetApp implements Action {
  public readonly type = RESET_APP;
}
export class LoadLocations implements Action {
  public readonly type = LOAD_LOCATIONS_DATA;
}
export class LoadLocationsSuccess implements Action {
  public readonly type = LOAD_LOCATIONS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadAllUsers implements Action {
  public readonly type = LOAD_ALL_USERS;
  constructor(public payload: number) {}
}
export class LoadAllUsersSuccess implements Action {
  public readonly type = LOAD_ALL_USERS_SUCCESS;

  constructor(public payload: any) {}
}

export class LoadAllTeams implements Action {
  public readonly type = LOAD_TEAMS;
}
export class LoadAllTeamsSuccess implements Action {
  public readonly type = LOAD_TEAMS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadCategories implements Action {
  public readonly type = LOAD_CATEGORIES;
}
export class LoadCategoriesSuccess implements Action {
  public readonly type = LOAD_CATEGORIES_SUCCESS;

  constructor(public payload: any) {}
}
export class AddCategory implements Action {
  public readonly type = ADD_CATEGORY;
  constructor(public payload: Category) {}
}
export class AddCategorySuccess implements Action {
  public readonly type = ADD_CATEGORY_SUCCESS;

  constructor(public payload: Category) {}
}
export class AddLocation implements Action {
  public readonly type = ADD_LOCATION;
  constructor(public payload: Location) {}
}
export class AddLocationSuccess implements Action {
  public readonly type = ADD_LOCATION_SUCCESS;

  constructor(public payload: Location) {}
}
export class AddTeam implements Action {
  public readonly type = ADD_TEAM;
  constructor(public payload: Team) {}
}
export class AddTeamSuccess implements Action {
  public readonly type = ADD_TEAM_SUCCESS;

  constructor(public payload: Team) {}
}

export class AddUser implements Action {
  public readonly type = ADD_USER;
  constructor(public payload: User) {}
}
export class AddUserSuccess implements Action {
  public readonly type = ADD_USER_SUCCESS;

  constructor(public payload: User) {}
}

export class AddProject implements Action {
  public readonly type = ADD_PROJECT;
  constructor(public payload: Project) {}
}
export class AddProjectSuccess implements Action {
  public readonly type = ADD_PROJECT_SUCCESS;

  constructor(public payload: Project) {}
}
export class LoadProjects implements Action {
  public readonly type = LOAD_PROJECTS;
}
export class LoadProjectsSuccess implements Action {
  public readonly type = LOAD_PROJECTS_SUCCESS;

  constructor(public payload: any) {}
}
export class LoadNotes implements Action {
  public readonly type = LOAD_NOTE;
  constructor(public payload: number) {}
}
export class LoadNotesSuccess implements Action {
  public readonly type = LOAD_NOTE_SUCCESS;

  constructor(public payload: Note) {}
}
export class DeleteNote implements Action {
  public readonly type = DELETE_NOTE;
  constructor(public payload: number) {}
}
export class DeleteNoteSuccess implements Action {
  public readonly type = DELETE_NOTE_SUCCESS;

  constructor(public payload: number) {}
}
export class Download implements Action {
  public readonly type = DOWNLOAD;
}
export class DownloadSuccess implements Action {
  public readonly type = DOWNLOAD_SUCCESS;
  constructor(public payload: string) {}

}
export class AddNote implements Action {
  public readonly type = ADD_NOTE;
  constructor(public payload: Note) {}
}
export class AddNoteSuccess implements Action {
  public readonly type = ADD_NOTE_SUCCESS;

  constructor(public payload: Note) {}
}

export type Actions =
  | Download
  | DownloadSuccess
  | LoadProjects
  | LoadProjectsSuccess
  | LoadAllData
  | LoadAllDataSuccess
  | LoadUser
  | LoadUserSuccess
  | LoadFail
  | LoadLocations
  | LoadLocationsSuccess
  | LoadAllUsers
  | LoadAllUsersSuccess
  | LoadAllTeams
  | LoadAllTeamsSuccess
  | LoadCategories
  | LoadCategoriesSuccess
  | AddLocation
  | AddLocationSuccess
  | AddProject
  | AddProjectSuccess
  | AddCategory
  | AddCategorySuccess
  | AddUser
  | AddUserSuccess
  | LoadNotes
  | LoadNotesSuccess
  | DeleteNote
  | DeleteNoteSuccess
  | AddNote
  | AddNoteSuccess
  | AddTeam
  | AddTeamSuccess
  | SetTitle
  | ResetApp;
