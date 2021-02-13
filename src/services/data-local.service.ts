import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  nombre: any;
  guardados: Registro[] = [];
  

  constructor( private storage: Storage,
               private navCtrl: NavController,
               private inAppBrowser: InAppBrowser,
               private file: File,
               private emailComposer: EmailComposer ) {
    // cargar registros
    this.cargarStorage();
  }

  async cargarStorage() {
    
    this.nombre = this.storage.get('escaneo');
  }


  guardarRegistro( format: string, text: string ) {

  

    const nuevoRegistro = new Registro( format, text );
    this.nombre = ( nuevoRegistro.text );

    console.log(this.nombre);
    this.storage.set('escaneo', this.nombre);

  //  this.abrirRegistro( nuevoRegistro );
  }

 /* abrirRegistro( registro: Registro ) {

    this.navCtrl.navigateForward('/tabs/tab2');

    switch ( registro.type ) {

      case 'http':
        this.inAppBrowser.create( registro.text, '_system' );
      break;

      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${ registro.text }`);
      break;

    }

  
  }*/




}
