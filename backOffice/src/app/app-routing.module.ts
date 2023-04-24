import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { AddEditProductoComponent } from './components/add-edit-productos/add-edit-productos.component';
import { ListTicketsComponent } from './components/list-tickets/list-tickets.component';
import { AddEditTicketComponent } from './components/add-edit-tickets/add-edit-tickets.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { AddEditUsersComponent } from './components/add-edit-users/add-edit-users.component';
import { ListGruposComponent } from './components/list-grupos/list-grupos.component';
import { AddEditGrupoComponent } from './components/add-edit-grupos/add-edit-grupos.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  
  {path:'',component:LoginComponent},
  {path:'ticket',component:ListTicketsComponent},
  {path:'ticket/add',component:AddEditTicketComponent},
  {path:'ticket/edit/:idTicket',component:AddEditTicketComponent},
  {path:'ticket/:idTicket/productos',component:ListProductosComponent},
  {path:'ticket/:idTicket/productos/add',component:AddEditProductoComponent},
  {path:'ticket/:idTicket/productos/edit/:idProducto',component:AddEditProductoComponent},
  {path:'producto',component:ListProductosComponent},
  {path:'producto/add',component:AddEditProductoComponent},
  {path:'producto/edit/:idProducto',component:AddEditProductoComponent},
  {path:'user',component:ListUsersComponent},
  {path:'user/add',component:AddEditUsersComponent},
  {path:'user/edit/:idUser',component:AddEditUsersComponent},
  {path:'grupo',component:ListGruposComponent},
  {path:'grupo/add',component:AddEditGrupoComponent},
  {path:'grupo/edit/:idGrupo',component:AddEditGrupoComponent},
  {path:'**',redirectTo:'',pathMatch:'full'} //Este siempre el ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
