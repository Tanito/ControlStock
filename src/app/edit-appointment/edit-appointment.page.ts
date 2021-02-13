import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AppointmentService } from './../shared/appointment.service';
import { ProductoService } from '../shared/producto.service';
import { NavController } from '@ionic/angular';
import { AnimationOptions } from '@ionic/angular/providers/nav-controller';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.page.html',
  styleUrls: ['./edit-appointment.page.scss'],
})

export class EditAppointmentPage implements OnInit {
  updateBookingForm: FormGroup;
  id: any;
  restar: number = 1;
  sumar: number = 1;
  boton: boolean = false;

  constructor(
    private aptService: AppointmentService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder,
    private prodService: ProductoService,
    public navCtrl: NavController,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.prodService.getProducto(this.id).valueChanges().subscribe(res => {
      this.updateBookingForm.setValue(res);
    });
  }

  ngOnInit() {
    this.updateBookingForm = this.fb.group({
      nombre: [''],
      foto: [''],
      cantidad: ['']
    })
    console.log(this.updateBookingForm.value)
  }

  back(){
    let animations:AnimationOptions={
      animated: true,
      animationDirection: "back"
    }
    this.navCtrl.back(animations)
  }

  visible(){
    this.boton = true;
  }

  updateForm() {
    this.prodService.updateBooking(this.id, this.updateBookingForm.value)
      .then(() => {
      //  this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

  sumar1(){

    this.sumar = this.sumar + 1;
  }

  restar1(){
    if (this.sumar > 1) {
    this.sumar = this.sumar - 1;}
    }

  mas1(){

    this.restar = this.restar + 1;
  }

  menos1(){
    if (this.restar > 1) {
      this.restar = this.restar - 1;}
    }

    retirar(){

      
     this.updateBookingForm.value.cantidad = this.updateBookingForm.value.cantidad - this.restar;
     // this.updateBookingForm.value.cantidad = this.updateBookingForm.value.cantidad - this.restar;
     this.restar = 1;
    }

    agregar(){
      this.updateBookingForm.value.cantidad = this.updateBookingForm.value.cantidad + this.sumar;
      this.sumar = 1;

    }

    
}