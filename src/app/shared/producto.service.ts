import { Injectable } from '@angular/core';
//import { Appointment } from '../shared/Appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { producto } from '../shared/producto';

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createProducto(prod: producto) {
    return this.bookingListRef.push({
      nombre: prod.nombre,
      foto: prod.foto,
      cantidad: prod.cantidad,
    })
  }

  // Get Single
  getProducto(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    return this.bookingRef;
  }

  // Get List
  getProductosList() {
    this.bookingListRef = this.db.list('/appointment');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, prod: producto) {
    return this.bookingRef.update({
        nombre: prod.nombre,
        foto: prod.foto,
        cantidad: prod.cantidad,
    })
  }

  // Delete
  deleteProducto(id: string) {
    this.bookingRef = this.db.object('/appointment/' + id);
    this.bookingRef.remove();
  }
}