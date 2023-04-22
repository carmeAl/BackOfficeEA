import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ID, Grupo } from '../interfaces/grupo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  
  private myAppUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;

    
  }

  getListGrupos(): Observable<Grupo[]> {
    const myApiUrl: string = 'grupo/all'
    return this.http.get<Grupo[]>(`${this.myAppUrl}${myApiUrl}`)
  }

  deleteGrupo(id: ID): Observable<void> {
    const myApiUrl: string = 'grupo/'
    return this.http.delete<void>(`${this.myAppUrl}${myApiUrl}${id}`)

  }

  crateGrupo(grupo: Grupo): Observable<Grupo> {
    const myApiUrl: string = 'grupo/'
    return this.http.post<Grupo>(`${this.myAppUrl}${myApiUrl}`, grupo);
  }

  getGrupo(id: string): Observable<Grupo> {
    const myApiUrl: string = 'grupo/';
    return this.http.get<Grupo>(`${this.myAppUrl}${myApiUrl}${id}`);
  }

  updateGrupo(id: string, user: Grupo): Observable<Grupo> {
    const myApiUrl: string = 'grupo/';
    return this.http.put<Grupo>(`${this.myAppUrl}${myApiUrl}${id}`, user);
  }


}