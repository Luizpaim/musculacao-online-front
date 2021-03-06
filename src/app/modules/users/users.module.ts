import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersDetailsComponent } from './users-details/users-details.component';



@NgModule({
  declarations: [
    UsersComponent,
    UsersEditComponent,
    UsersDetailsComponent,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule

  ]

})
export class UsersModule { }
