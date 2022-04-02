
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { NotificationService } from 'src/app/shared/services/notification.service';
import { Profile } from '../_models/profile.model';
import { User } from '../_models/user.model';
import { ProfilesService } from '../_services/profiles.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['profile','name', 'email','action'];
  displayedColumnsMobile = ['name','action'];
  userList: User[] =[];
  profilesList : Profile[] = [];

 filter : string = '';

  constructor(private usersService:UsersService,
    private profilesService: ProfilesService,
   private notificationService : NotificationService,
   private router : Router) { }

  ngOnInit(): void {
 this.getAll();
 this.getName('name', '');
 this.getEmail('email', '');

 this.getAllProfiles();
  }



deleteUser(id: string){
this.usersService.delete(id).subscribe(response => {
 if(response.success){
  this.getAll();
  this.notificationService.success('Usuário excluido com Sucesso !')
  return;
 }
 this.notificationService.error('Erro ao excluir usuário')

});
}

create(): void {
this.router.navigate(['/users/create']);
}

private getAll(): void {
  this.usersService.getAll().subscribe(response => {
    this.userList = response.data;
    this.profilesList = response.data;
       });
}
private getName(name: string, filter : string = this.filter): void {
  this.usersService.getName(name,filter).subscribe(response => {
    this.userList = response.data;
    this.profilesList = response.data;
       });
}
private getEmail(email: string, filter : string = this.filter): void {
  this.usersService.getEmail(email,filter).subscribe(response => {
    this.userList = response.data;
    this.profilesList = response.data;
       });
}
private getAllProfiles(): void {
  this.profilesService.getAll().subscribe(response => {
    this.profilesList = response.data;
    
  });
}
search(): void {
  if(this.filter){
    const name : string = 'name'
    const email : string = 'email'
    this.getEmail(email, this.filter);
    this.getName(name, this.filter);
    return;
    }

  }
employees():void{
  this.getAll();
}

}
