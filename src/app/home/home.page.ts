import { Component, OnInit } from '@angular/core';
//import { Appointment } from '../shared/Appointment';
import { AppointmentService } from './../shared/appointment.service';
import { ProductoService } from '../shared/producto.service';
import { producto } from '../shared/producto';
//import { IonReorderGroup } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
//import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
 Productos = [];
 textoBuscar = '';

  constructor(
    private aptService: AppointmentService,
    private prodService: ProductoService,
    private firestore: AngularFirestore,
  ) { }

   ngOnInit() {

    this.fetchBookings();
    let bookingRes = this.prodService.getProductosList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Productos = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Productos.push(a as producto);
      })
    })
  }




  fetchBookings() {
    this.prodService.getProductosList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteProducto(id) {
    console.log(id)
    if (window.confirm('Seguro que desea borrarlo?')) {
      this.prodService.deleteProducto(id)
    }
  }

  buscar( event ) {
   //  console.log(event);
    this.textoBuscar = event.detail.value;
  }
}
