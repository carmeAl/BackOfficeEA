import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ListGruposComponent } from './components/list-grupos/list-grupos.component';
import { AddEditGrupoComponent } from './components/add-edit-grupos/add-edit-grupos.component';



const routes: Routes = [
  
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
