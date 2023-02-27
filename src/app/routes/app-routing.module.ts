
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactComponent } from '../components/contact/contact.component';
import { AboutComponent } from '../components/about/about.component';
import { HomeComponent } from '../components/home/home.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from './../components/register/register.component';
import { AdminComponent } from '../components/admin/admin.component';
import { BooksComponent } from './../components/books/books.component';

import { AuthGuard } from './../guard/auth.guard';
import { LoginGuard } from './../guard/login.guard';
import { ModuleUser } from './../models/moduleUser';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: { roles: ModuleUser.AdminModule },
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [LoginGuard],
    component: RegisterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
