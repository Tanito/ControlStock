import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../shared/producto.service';
import { producto } from '../shared/producto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Productos = [];
  textoBuscar = '';

  constructor(
    private prodService: ProductoService,
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

    })
  }
  deleteProducto(id) {
    if (window.confirm('Seguro que desea borrarlo?')) {
      this.prodService.deleteProducto(id)
    }
  }
  buscar(event) {
    this.textoBuscar = event.detail.value;
  }
}
