import * as app from "../actions/app";
import { User, Team, Category, Project, Note } from "../../models/models";

const entityData = {
  data: [],
  lastLoaded: null
};
export interface State {
  loading: boolean;
  loaded: boolean;
  categories: {
    data: Category[];
    lastLoaded: string;
  };
  user: User;
  title: string;
  locations: {
    data: Location[];
    lastLoaded: string;
  };
  users: {
    data: User[];
    lastLoaded: string;
  };
  teams: {
    data: Team[];
    lastLoaded: string;
  };
  projects: {
    data: Project[];
    lastLoaded: string;
  };
  notes: Note[];
  downloadFile: string;
  error: string;
}
export const initState: State = {
  loading: false,
  loaded: false,
  categories: entityData,
  user: null,
  title: "Home / Login",
  locations: entityData,
  users: entityData,
  teams: entityData,
  projects: entityData,
  notes: [],
  downloadFile: null,
  error: null
};
export function reducer(state = initState, action: app.Actions): State {
  console.log(action.type);
  switch (action.type) {
    case app.SET_TITLE:
      return Object.assign({}, state, {
        title: action.payload
      });
    case app.LOAD_ALL_DATA:
    case app.LOAD_PROJECTS:
    case app.ADD_PROJECT:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });

    case app.ADD_PROJECT_SUCCESS:
      let p: Project[] = [...state.projects.data];

      const id = action.payload.ID;
      const pID = p.findIndex(o => o.ID == id);
      if (pID >= 0) {
        p[pID] = action.payload;
      } else {
        p.push(action.payload);
      }
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        projects: {
          data: p,
          lastLoaded: state.projects.lastLoaded
        }
      });
    case app.LOAD_PROJECTS_SUCCESS:
      console.log(action.payload);
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        projects: {
          data: action.payload || [],
          lastLoaded: Date.now()
        }
      });
    case app.LOAD_USER_DATA:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        user: null
      });
    case app.ADD_USER_SUCCESS:
      let u: User[] = [...state.users.data];

      const userID = action.payload.ID;
      const uID = u.findIndex(o => o.ID == userID);
      if (uID >= 0) {
        u[uID] = action.payload;
      } else {
        u.push(action.payload);
      }
      let sessUser = state.user;
      if (sessUser.ID == userID) {
        sessUser = action.payload;
      }
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        user: sessUser,
        users: {
          data: u,
          lastLoaded: state.users.lastLoaded
        }
      });
    case app.LOAD_USER_SUCCESS:
      console.log(action.payload);
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        user: action.payload
      });
    case app.LOAD_LOCATIONS_DATA:
      return Object.assign({}, state, {
        loading: true,
        loaded: false,
        locations: entityData
      });
    case app.LOAD_LOCATIONS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        locations: {
          data: action.payload || [],
          lastLoaded: Date.now()
        }
      });

    case app.LOAD_ALL_USERS:
      return Object.assign({}, state, {
        users: entityData
      });
    case app.LOAD_ALL_USERS_SUCCESS:
      return Object.assign({}, state, {
        users: {
          data: action.payload || [],
          lastLoaded: Date.now()
        }
      });
    case app.LOAD_TEAMS:
      return Object.assign({}, state, {
        teams: entityData
      });
    case app.LOAD_TEAMS_SUCCESS:
      return Object.assign({}, state, {
        teams: {
          data: action.payload || [],
          lastLoaded: Date.now()
        }
      });
    case app.LOAD_CATEGORIES:
      return Object.assign({}, state, {
        categories: entityData
      });
    case app.LOAD_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        categories: {
          data: action.payload || [],
          lastLoaded: Date.now()
        }
      });

    case app.ADD_USER:
    case app.ADD_NOTE:
    case app.DELETE_NOTE:
    case app.ADD_LOCATION:
    case app.ADD_CATEGORY:
      return Object.assign({}, state, {
        loaded: false,
        error: null
      });
    case app.DELETE_NOTE_SUCCESS:
      let noteID = action.payload;
      const notes = [...state.notes];
      let i = notes.findIndex(o => o.ID == noteID);
      const pData = [...state.projects.data];

      if (i >= 0) {
        let pid = notes[i].ProjectID;

        notes.splice(i, 1);

        i = pData.findIndex(o => o.ID == pid);
        if (i >= 0 && pData[i].Note.ID == noteID) {
          let n: Note = notes.length
            ? notes[0]
            : {
                ID: 0,
                Note: "",
                ProjectID: 0,
                UserID: 0,
                AddedOn: ""
              };
          pData[i] = Object.assign({}, pData[i], { Note: n });
        }
      }
      return Object.assign({}, state, {
        loaded: true,
        notes: notes,
        projects: {
          data: pData,
          lastLoaded: state.projects.lastLoaded
        }
      });
    case app.ADD_NOTE_SUCCESS:
      let pj = [...state.projects.data];
      let ind = pj.findIndex(o => o.ID == action.payload.ProjectID);
      if (ind >= 0) {
        pj[ind] = Object.assign({}, pj[ind], { Note: action.payload });
      }
      return Object.assign({}, state, {
        loaded: true,
        projects: Object.assign({}, state.projects, {
          data: pj,
          lastLoaded: state.projects.lastLoaded
        })
      });
    case app.ADD_CATEGORY_SUCCESS:
      let cats: Category[];
      cats = [...state.categories.data, action.payload];
      return Object.assign({}, state, {
        loaded: true,
        categories: Object.assign({}, state.categories, {
          data: cats,
          lastLoaded: state.categories.lastLoaded
        })
      });
    case app.ADD_TEAM_SUCCESS:
      let t: Team[];
      t = [...state.teams.data, action.payload];
      return Object.assign({}, state, {
        loaded: true,
        teams: {
          data: t,
          lastLoaded: state.teams.lastLoaded
        }
      });
    case app.ADD_LOCATION_SUCCESS:
      let locs: Location[];
      locs = [...state.locations.data, action.payload];
      return Object.assign({}, state, {
        loaded: true,
        locations: Object.assign({}, state.locations, {
          data: locs,
          lastLoaded: state.locations.lastLoaded
        })
      });
    case app.RESET_APP:
      return initState;

    case app.LOAD_NOTE:
      return Object.assign({}, state, {
        notes: [],
        error: null
      });
    case app.LOAD_NOTE_SUCCESS:
      return Object.assign({}, state, {
        notes: action.payload
      });
    case app.LOAD_FAIL:
      console.log(JSON.stringify(action.payload));
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        error: action.payload
      });
    case app.DOWNLOAD_SUCCESS:
    console.log(action.payload)
      return Object.assign({}, state, {
        loaded: true,
        downloadFile: action.payload
      });
    case app.DOWNLOAD:
      return Object.assign({}, state, {
        loaded: false,
        downloadFile: null
      });

    case app.LOAD_ALL_DATA_SUCCESS:
    default:
      return Object.assign({}, state, {
        loading: false,
        loaded: true
      });
  }
}
