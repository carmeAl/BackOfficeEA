import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { ListProductosComponent } from './components/list-productos/list-productos.component';
import { AddEditProductoComponent } from './components/add-edit-producto/add-edit-producto.component';

const routes: Routes = [
  {path:'',component:ListProductosComponent},
  {path:'addProducto',component:AddEditProductoComponent},
  {path:'edit/:id',component:AddEditProductoComponent},
  {path:'**',redirectTo:'',pathMatch:'full'} //Este siempre el ultimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
