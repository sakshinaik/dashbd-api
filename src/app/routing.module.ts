import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './home/login.component';
import { UserProfileComponent } from './entities/user.component';
import { ProjectFormComponent } from './entities/projects/project-form.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProjectListComponent } from './entities/projects/project-list.component';
import { DownloadComponent } from './entities/projects/download';


const routes: Routes = [
  { path: '', component: LoginComponent },
  
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'projects', component: ProjectFormComponent, canActivate:[AuthGuard] },
  { path: 'projects/index', component: ProjectListComponent, canActivate:[AuthGuard] },
  { path: 'settings', component: SettingsComponent,  canActivate:[AuthGuard] },
  { path: 'download', component: DownloadComponent,  canActivate:[AuthGuard] },
  
  {path: '**', component: LoginComponent}
];

@NgModule({
  imports: [
   RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
