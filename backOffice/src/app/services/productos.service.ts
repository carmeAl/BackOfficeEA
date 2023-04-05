import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private myAppUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl=environment.endpoint;
    
   }

   getListProductos():Observable<Producto[]>{
    const myApiUrl:string='producto/all'
    return this.http.get<Producto[]>(`${this.myAppUrl}${myApiUrl}`)
   }

   deleteProducto(id:ID):Observable<void>{
    const myApiUrl:string='producto/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)
    
   }

   crateProduco(producto:Producto):Observable<void>{
    const myApiUrl:string='producto/'
    return this.http.post<void>(`${this.myAppUrl}${myApiUrl}`,producto);
   }

   getProducto(id:string):Observable<Producto>{
    const myApiUrl:string='producto/';
    return this.http.get<Producto>(`${this.myAppUrl}${myApiUrl}${id}`);
   }

   updateProducto(id:string,product:Producto):Observable<Producto>{
    const myApiUrl:string='producto/';
    return this.http.put<Producto>(`${this.myAppUrl}${myApiUrl}${id}`,product);
   }
}
