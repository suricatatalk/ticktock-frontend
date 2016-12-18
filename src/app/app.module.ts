import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule }   from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TaskInputComponent } from './task-input/task-input.component';



@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    LoginComponent,
    HomeComponent,
    LoginComponent,
    TaskInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
