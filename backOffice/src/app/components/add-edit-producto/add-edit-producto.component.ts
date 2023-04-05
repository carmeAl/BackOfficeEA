import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID, Producto } from 'src/app/interfaces/producto';
import { ListProductosComponent } from '../list-productos/list-productos.component';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-producto',
  templateUrl: './add-edit-producto.component.html',
  styleUrls: ['./add-edit-producto.component.css']
})
export class AddEditProductoComponent {
  formProducto: FormGroup;
  loading: boolean = false;
  id: string;
  operacion: string = 'Añadir ';

  constructor(private fb: FormBuilder,
    private _productService: ProductosService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute) {
    this.formProducto = this.fb.group({
      //Para poner mas de una validacion hay que ponerlas entre claudators
      name: ['', Validators.required],
      quantity: [null, Validators.required],
      price: [null, Validators.required],
      totalPrice: [null]
    })
    this.id = aRouter.snapshot.paramMap.get("id")!;
  }
  ngOnInit(): void {
    if (this.id != null) {
      this.operacion = 'Actualizar ';
      this.getProduct(this.id);
    }
  }


  addProducto() {
    const product: Producto = {
      name: this.formProducto.value.name,
      quantity: this.formProducto.value.quantity,
      price: this.formProducto.value.price,
      totalprice: this.formProducto.value.totalPrice,

    }

    this.loading = true;
    if (this.id !== null) {
      //Es update
      this._productService.updateProducto(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      })
    } else {
      //Es crear
      this._productService.crateProduco(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue agregado con exito`, 'Producto agregado')
        this.loading = false;
        this.router.navigate(['/']);
      })
    }
    



  }

  getProduct(id: string) {
    this.loading = true;
    this._productService.getProducto(id).subscribe((data: Producto) => {
      this.loading = false;
      this.formProducto.patchValue({
        name: data.name,
        quantity: data.quantity,
        price: data.price,
        totalPrice: data.totalprice,
      })
    })
  }

}
