import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ID, Producto } from 'src/app/interfaces/user';
import { ProductosService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  listUsers: User[] = [];
  loading: boolean = false;
  idUser: string;

  constructor(private _usersService: UsersService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.idUser = aRouter.snapshot.paramMap.get("idUser")!;
  }

  ngOnInit(): void {
    if (this.idUser != null) {
      this.getUsersTicket(this.idUser);
    }else{
      this.getListUsers()
    }
    
  }

  getListUsers() {
    this.loading = true;
    this._usersService.getListUsers().subscribe((data: Users[]) => {
      this.listUsers = data;
      this.loading = false;
    })
  }

  deleteUser(id: ID) {
    this.loading = true;
    this._usersService.deleteUser(id).subscribe(() => {
      //this.loading=false;
      //if (this.idUser != null) {
        //this.getProductosTicket(this.idUser);
      //}else{
        //this.getListUsers()
      }
      this.toastr.warning('El user fue eliminado con exito', 'user eliminado');
    });
  }

  //getProductosTicket(id:string) {
    //this.loading = true;
    //this._usersService.getProductosTicket(id).subscribe((data: Producto[]) => {
      //this.listUsers = data;
      //this.loading = false;
    //})
  //}

}
