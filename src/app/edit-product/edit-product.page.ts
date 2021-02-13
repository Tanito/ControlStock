import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductoService } from '../shared/producto.service';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})

export class EditProductPage implements OnInit {
  updateProductoForm: FormGroup;
  id: any;
  restar: number = 1;
  sumar: number = 1;
  boton: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private prodService: ProductoService,
    public navCtrl: NavController,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.prodService.getProducto(this.id).valueChanges().subscribe(res => {
      this.updateProductoForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateProductoForm = this.fb.group({
      nombre: [''],
      foto: [''],
      cantidad: ['']
    })
    console.log(this.updateProductoForm.value)
  }

  back() {
    let animations: AnimationOptions = {
      animated: true,
      animationDirection: "back"
    }
    this.navCtrl.back(animations)
  }

  visible() {
    this.boton = true;
  }

  updateForm() {
    this.prodService.updateProducto(this.id, this.updateProductoForm.value)
      .then(() => {
        //  this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

  sumar1() {

    this.sumar = this.sumar + 1;
  }

  restar1() {
    if (this.sumar > 1) {
      this.sumar = this.sumar - 1;
    }
  }

  mas1() {

    this.restar = this.restar + 1;
  }

  menos1() {
    if (this.restar > 1) {
      this.restar = this.restar - 1;
    }
  }

  retirar() {
    this.updateProductoForm.value.cantidad = this.updateProductoForm.value.cantidad - this.restar;
    this.restar = 1;
  }

  agregar() {
    this.updateProductoForm.value.cantidad = this.updateProductoForm.value.cantidad + this.sumar;
    this.sumar = 1;

  }


}