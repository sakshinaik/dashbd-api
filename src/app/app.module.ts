import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatTooltipModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatProgressBarModule
} from "@angular/material";
import { LayoutModule } from "@angular/cdk/layout";

import { RoutingModule } from "./routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardHeaderComponent } from "./dashboard-header.component";
import { SideNavComponent } from "./side-nav.component";
import { SideNavDirective } from "./directives/side-nav.directive";
import { ProjectFormComponent } from "./entities/projects/project-form.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { reducers, metaReducers } from "./store/reducer";
import { LoginComponent } from "./home/login.component";
import { AuthGuard } from "./services/auth-guard.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APIService } from "./services/api.service";

import { EffectsModule } from "@ngrx/effects";
import { AppEffects } from "./store/effects/app";
import { ProjectEffects } from "./store/effects/projects";
import { DialogComponent } from "./dialog.component";
import { CategoryFormComponent } from "./entities/category-form.component";
import { UserProfileComponent } from "./entities/user.component";
import { SettingsComponent } from "./settings/settings.component";
import { UserListComponent } from "./settings/user-list.component";
import { TeamListComponent } from "./settings/team-list.component";
import { LocationListComponent } from "./settings/location-list.component";
import {
  TimeoutInterceptor,
  DEFAULT_TIMEOUT,
  defaultTimeout
} from "./services/timeout-interceptor";
import { DialogService } from "./services/dialog.service";
import { CategoryListComponent } from "./settings/category-list.component";
import { LocationFormComponent } from "./entities/location-form.component";
import { CustomDataComponent } from "./entities/projects/custom-data.component";
import { NoteComponent } from "./entities/projects/note.component";
import { NoteListComponent } from "./entities/projects/note-list.component";
import { ProjectListComponent } from "./entities/projects/project-list.component";
import { DownloaderService } from "./services/downloader.service";
import { UserFormComponent } from "./entities/user-form.component";
import { TeamFormComponent } from "./entities/team-form.component";
import { DownloadComponent } from "./entities/projects/download";

@NgModule({
  declarations: [
    AppComponent,
    CategoryFormComponent,
    CategoryListComponent,
    CustomDataComponent,
    DashboardHeaderComponent,
    DialogComponent,
    LocationListComponent,
    LocationFormComponent,
    LoginComponent,
    NoteComponent,
    NoteListComponent,
    ProjectFormComponent,
    ProjectListComponent,
    SettingsComponent,
    SideNavComponent,
    SideNavDirective,
    TeamListComponent,
    UserProfileComponent,
    UserListComponent,
    UserFormComponent,
    TeamFormComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatBadgeModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    RoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects, ProjectEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [
    AuthGuard,
    APIService,
    AppEffects,
    DialogService,
    DownloaderService,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: defaultTimeout }]
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
    ProjectFormComponent,
    NoteListComponent,
    CategoryFormComponent,
    LocationFormComponent,
    CustomDataComponent,
    NoteComponent,
    TeamFormComponent,
    UserFormComponent
  ]
})
export class AppModule {}
