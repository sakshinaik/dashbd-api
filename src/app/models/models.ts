export interface ResponseData {
  data: any;
  error: any;
}
export interface Category {
  ID: number;
  Category: string;
}

export interface Project {
  ID: number;
  Project: string;
  MOP: number;
  TeamID: number;
  CategoryID: number;
  LocationID: number;
  StackholderIDs: string;
  UserIDs: string;
  EstEndDate: string;
  ActEndDate: string;
  Priority: number;
  ScheduleStatus: string;
  Stage: string;
  AddedOn: string;
  UpdatedOn: string;
  AddedUserID: number;
  UpdatedUserID: number;
  AddedUser: User;
  UpdatedUser: User;
  Team: Team;
  Category: Category;
  Location: Location;
  Note: Note;
}
export interface Location {
  ID: number;
  Location: string;
}
export interface Team {
  ID: number;
  Team: string;
  Initials: string;
}
export interface User {
  ID: number;
  Username: string;
  Firstname: string;
  Lastname: string;
  Email: string;
  Active: number;
  IsAdmin: number;
  TeamID: number;
  Team: Team;
}
export interface Note {
  ID: number;
  Note: string;
  ProjectID: number;
  UserID: number;
  AddedOn: string;
}
