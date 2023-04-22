import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Grupo } from 'src/app/interfaces/grupo';

import { GrupoService } from 'src/app/services/grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-grupo',
  templateUrl: './add-edit-grupos.component.html',
  styleUrls: ['./add-edit-grupos.component.css']
})
export class AddEditGrupoComponent {
  formGrupo: FormGroup;
  loading: boolean = false;
  idGrupo: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _grupoService: GrupoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private _location: Location) {
    this.formGrupo = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      password: [null, Validators.required],
    })
    this.idGrupo = aRouter.snapshot.paramMap.get("idGrupo")!;

  }
  ngOnInit(): void {
    if (this.idGrupo != null) {
      this.operacion = 'Actualizar ';
      this.getGrupo(this.idGrupo);
    }
  }

  goBack(){
    this._location.back();
  }


  addGrupo() {
    const grupo: Grupo = {
      name: this.formGrupo.value.name,
      password: this.formGrupo.value.password,      
      users: this.formGrupo.value.users,
      tickets: this.formGrupo.value.tickets,
    }

    this.loading = true;
    if (this.idGrupo !== null) {
      //Es update
      this._grupoService.updateGrupo(this.idGrupo, grupo).subscribe(() => {
        this.toastr.info(`El grupo ${grupo.name} fue actualizado con exito`, 'Grupo actualizado');
        this.loading = false;
       this.router.navigate([`/`]);
       
      })
    } else {
      //Es crear
      this._grupoService.crateGrupo(grupo).subscribe((data:Grupo) => {
        this.toastr.success(`El grupo ${grupo.name} fue agregado con exito`, 'Grupo agregado')
        this.loading = false;
        this.idGrupo=String(data._id!);
        console.log(data);
      })

    }
    
  }

  getGrupo(id: string) {
    this.loading = true;
    this._grupoService.getGrupo(id).subscribe((data: Grupo) => {
      this.loading = false;
      this.formGrupo.patchValue({
        name: data.name,
        password: data.password,
        user: data.users,
        tickets: data.tickets,
      })
    })
  }

}