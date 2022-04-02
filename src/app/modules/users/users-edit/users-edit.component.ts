
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { Profile } from '../_models/profile.model';
import { User } from '../_models/user.model';
import { ProfilesService } from '../_services/profiles.service';

import { UsersService } from '../_services/users.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  usersForm: FormGroup;
  usersModel!: User;
  userId: string = '';
  profilesList: Profile[] = [];



  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private profilesService: ProfilesService,
    private router: Router,
    private route: ActivatedRoute


  ) {
    this.usersForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      birth_date: ['', Validators.required],
      sex: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
      profile: ['', Validators.required]

    });
    this.getAllProfiles();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = id;
      this.usersService.getById(id).subscribe(response => {
        this.usersModel = response.data;
     
          this.usersForm.patchValue({
          name: this.usersModel.name,
          email: this.usersModel.email,
          birth_date: this.usersModel.birth_date,
          sex: this.usersModel.sex,
          profile: this.usersModel.profile._id

        });
      });

    }
  }

  save(): void {
    if (this.usersForm.invalid === true) {
      this.notificationService.warning('Verifique os dados do formulário e tente novamente');
      return;
    }

    this.usersModel = Object.assign({}, this.usersForm.value);

    const profileId = this.usersForm.controls['profile'].value;
    const profile = this.profilesList.find(p => p._id === profileId) as Profile;
    this.usersModel.profile = profile;


    if (this.userId !== '') {
      this.update();
    }
    else {
      this.create();
    }

  }

  returnToUsersPage(): void {
    this.router.navigate(['/users']);
  }

  create(): void {

    if (!this.isFormFieldsValid()) {
      return;
    }
    if (!this.isPasswordFieldsValid()) {
      return;
    }

    this.usersService.create(this.usersModel).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Usuário salvo com sucesso');
        this.returnToUsersPage();
        return;
      }
      this.notificationService.error('Erro ao salvar o Usuário');
    }, error => {
      this.notificationService.error('Ocorreu um erro ');
    });
  }
  update(): void {

    if (!this.isFormFieldsValid()) {
      return;
    }

    this.usersService.update(this.userId, this.usersModel).subscribe(response => {
      if (response.success) {
        this.notificationService.success('Usuário Atualizado com sucesso');
        this.router.navigate(['/users']);
        return;
      }
      this.notificationService.error('Erro ao Atualizar o Usuário');
    });
  }

  private isFormFieldsValid(): boolean {
    const name = this.usersForm.controls['name'].value;
    const email = this.usersForm.controls['email'].value;
    const birth_date = this.usersForm.controls['birth_date'].value;
    const sex = this.usersForm.controls['sex'].value;
    const profile = this.usersForm.controls['profile'].value;


    if (name === '') {
      this.notificationService.warning('Campo Nome é obrigatório');
      return false;
    }
    if (email === '') {
      this.notificationService.warning('Campo E-mail é obrigatório');
      return false;
    }
    if (birth_date === '') {
      this.notificationService.warning('Campo Data Nascimento é obrigatório');
      return false;
    }
    if (sex === '') {
      this.notificationService.warning('Campo Sexo é obrigatório');
      return false;
    }
    if (profile === '') {
      this.notificationService.warning('Campo Perfil é obrigatório');
      return false;
    }

    return true;

  }
  private isPasswordFieldsValid(): boolean {
    const password = this.usersForm.controls['password'].value;
    const confirmPassword = this.usersForm.controls['confirmPassword'].value;

    if (password === '') {
      this.notificationService.warning('Campo senha é obrigatório');
      return false;
    }

    if (confirmPassword === '') {
      this.notificationService.warning('Campo confirmação de senha é obrigatório');
      return false;
    }
    if (password !== confirmPassword) {
      this.notificationService.warning('As informadas não coincidem')
      return false;
    }
    return true;

  }
  private getAllProfiles(): void {
    this.profilesService.getAll().subscribe(response => {
      this.profilesList = response.data;
      console.log(response);
    });
  }
}
