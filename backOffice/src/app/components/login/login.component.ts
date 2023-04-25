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
    this._usersService.login(name,password).subscribe({
      next: (result) => {
        console.log(result.user.role);
        if (result.user.role === "Admin"){
          this.router.navigate([`/user`]); 
        } else {
          this.toastr.warning('No tienes permisos para acceder, tu role no es el indicado','Credenciales incorrectos');
        }
      },
      error: (error) => {
          // throw error;
          this.toastr.warning('Credenciales de usuario incorrectos','Credenciales incorrectos');
          throw error.message;
      },
  }
    );
    
    /*this.getListUsers();
    console.log(this.listUsers.length);
    var x = 0;
    while (this.listUsers.length > x){
        if (name==this.listUsers[x].name && password==this.listUsers[x].password){
            if (this.listUsers[x].role == "Admin"){
              this.router.navigate([`/user`]); 
            }
        }
        x++;
    }*/
  }

}