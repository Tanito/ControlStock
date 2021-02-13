export class Registro {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor( format: string, text: string ) {

        this.format = format;
        this.text = text;

        this.created = new Date();

      //  this.determinarTipo();

    }

   /* private determinarTipo() {

        const inicioTexto = this.text.substr(0, 4);
        console.log('TIPO', inicioTexto );

        switch ( inicioTexto ) {

            case 'merm':
                this.type = 'mermelada';
                this.icon = 'pricetag-outline';
                               
            break;

            case 'dulc':
                this.type = 'dulce';
                this.icon = 'pint-outline';
            break;

            default:
                this.type = 'No reconocido';
                this.icon = 'create';
        }

    }*/


}
