import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Profile } from '../_models/profile.model';
import { User } from '../_models/user.model';
import { ProfilesService } from '../_services/profiles.service';
import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  displayedColumns = [ 'name', 'email', 'birth_date', 'sex', 'profile', 'action'];
  
displayedName = [ 'name'];
displayedEmail = [  'email'];
displayedBirth_date = [ 'birth_date'];
displayedSex = [ 'sex'];
displayedProfile = ['profile'];
displayedAction = ['action'];

  userList: User[] =[];
  profilesList : Profile[] = [];
  userId: string = '';
  usersModel!: User;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private usersService : UsersService,
    private profilesService : ProfilesService,
   private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
 const id = this.route.snapshot.paramMap.get('id');
 if (id){
   this.userId = id;
   this.usersService.getById(id).subscribe(response => {
     this.usersModel = response.data;
     this.userList = [response.data]
    
   })
 }
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
    private getAll(): void {
      this.usersService.getAll().subscribe(response => {
        this.userList = response.data;
        this.profilesList = response.data;
           });
    }
    returnToUsersPage(): void {
      this.router.navigate(['/users']);
    }
}
