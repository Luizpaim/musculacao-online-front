import { Component, NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { UsersDetailsComponent } from './users-details/users-details.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'create',
    component: UsersEditComponent
  },
  {
    path:'edit/:id',
    component :UsersEditComponent
  },
  {
    path: 'details/:id',
    component: UsersDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
