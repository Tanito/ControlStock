import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

import { ProductoService } from '../shared/producto.service';
import { producto } from '../shared/producto';
import { Router } from '@angular/router';



@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  nombre: string;
  cantidad: number;
  foto: string;
  Productos = [];
  infoescaneo: boolean = false;
  key: string;

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  constructor(
              private barcodeScanner: BarcodeScanner,
              private dataLocal: DataLocalService,
              private storage: Storage, 
              private prodService: ProductoService,
              private router: Router,

  ) { }

    // comparar this.nombre con el array Productos, y buscar la "key" del producto, para abrir la págna edit-appoint.....
    // traer el array Productos
    
   async buscarProd(){ for( var i = 0; i < this.Productos.length; i ++) {
         if  (this.Productos[i].nombre === this.nombre) {
      //  this.key = this.Productos[i].$key
      this.key = await this.Productos[i].$key
            
      this.cantidad = await this.Productos[i].cantidad
      
      this.foto = await this.Productos[i].foto
 // console.log('key',this.key)
 this.router.navigate(['/edit-appointment/', this.key])
      }
    }
    
  }


  ionViewDidEnter() {
    // console.log('viewDidEnter');
  }

  ionViewDidLeave() {
    // console.log('viewDidLeave');
  }

  ionViewWillEnter() {
    // console.log('viewWillEnter');
   // console.log('Prueba',this.nombre)
    this.scan();
  }

  ionViewWillLeave() {
    // console.log('viewWillLeave');
  }

   scan() {

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.nombre = barcodeData.text;

    this.dataLocal.guardarRegistro( barcodeData.format, barcodeData.text );

      if ( !barcodeData.cancelled ) {
        this.dataLocal.guardarRegistro( barcodeData.format, barcodeData.text );
        
      }

     }).catch(err => {
         console.log('Error', err);

        // this.dataLocal.guardarRegistro( 'QRCode', 'https://fernando-herrera.com' );
        //this.dataLocal.guardarRegistro( 'QRCode', 'geo:40.73151796986687,-74.06087294062502' );
        this.dataLocal.guardarRegistro( '', this.nombre );

     });
     this.infoescaneo = true;

  //  this.buscarProd()
  }


  fetchBookings() {
    this.prodService.getProductosList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

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

}
