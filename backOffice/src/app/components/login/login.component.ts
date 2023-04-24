import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ID, User } from 'src/app/interfaces/user';
//import { ListUsersComponent } from '../list-productos/list-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  listUsers: User[] = [];
  formLogin: FormGroup;
  formUsers: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private _usersService: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formLogin = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      password: [null, Validators.required] 
    })
    this.formUsers = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      surname: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required] 
    })

  }

  goBack(){
    this._location.back();
  }

  getListUsers() {
    this.loading = true;
    this._usersService.getListUsers().subscribe((data: User[]) => {
      this.listUsers = data;
      this.loading = false;
    })
  }


  login() {
    const name= this.formLogin.value.name;
    const password = this.formLogin.value.password;
    this.getListUsers();
    const x = 0;
    while (this.listUsers.length > 0){
        if (name==this.listUsers[x].name && password==this.listUsers[x].password){
            if (this.listUsers[x].role == "Admin"){
              this.router.navigate([`/`]); 
            }
        }
    }
  }

}