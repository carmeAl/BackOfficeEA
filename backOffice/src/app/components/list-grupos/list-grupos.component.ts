import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ID, Grupo } from 'src/app/interfaces/grupo';
import { GrupoService } from 'src/app/services/grupo.service';
 

@Component({
  selector: 'app-list-grupos',
  templateUrl: './list-grupos.component.html',
  styleUrls: ['./list-grupos.component.css']
})
export class ListGruposComponent {
  listGrupos: Grupo[] = [];
  loading: boolean = false;
  idGrupo: string;

  constructor(private _grupoService: GrupoService,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.idGrupo = aRouter.snapshot.paramMap.get("idGrupo")!;
  }

  ngOnInit(): void {
    if (this.idGrupo != null) {
      this.getListGrupos
    }else{
      this.getListGrupos()
    }
    
  }

  getListGrupos() {
    this.loading = true;
    this._grupoService.getListGrupos().subscribe((data: Grupo[]) => {
      this.listGrupos = data;
      this.loading = false;
    })
  }

  deleteGrupo(id: ID) {
    this.loading = true;
    this._grupoService.deleteGrupo(id).subscribe(() => {
      this.toastr.warning('El grupo fue eliminado con exito', 'grupo eliminado');
    });
  }
}
