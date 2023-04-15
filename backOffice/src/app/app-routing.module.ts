import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { AddEditProductoComponent } from './components/add-edit-users/add-edit-users.component';



const routes: Routes = [
  
  {path:'user',component:ListUsersComponent},
  {path:'user/add',component:AddEditUserComponent},
  {path:'user/edit/:idUser',component:AddEditTicketComponent},
  {path:'**',redirectTo:'',pathMatch:'full'} //Este siempre el ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
