import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { PipeModule } from './pipe/pipe.module'
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthStorageService } from './auth-storage.service';
import { HttpSecuredService } from './http-secured.service';
import { TaskInputComponent } from './task-input/task-input.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ConnectionBackend, RequestOptions, Response } from '@angular/http';
import { BackendService } from './backend.service';
import { SettingsComponent } from './settings/settings.component';
import { TaskComponent } from './task/task.component';



@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    HomeComponent,
    LoginComponent,
    TaskInputComponent,
    TaskListComponent,
    SettingsComponent,
    TaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]),
    PipeModule
  ],
  providers: [AuthStorageService, HttpSecuredService,BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
