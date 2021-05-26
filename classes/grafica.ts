export class GraficaData{
    private labels: string[]=[];
    private valores : number[]=[0,0,0,0];
    // private meses: string[]=['enero', 'febrero', 'marzo', 'april'];
    // private valores : number[]=[1,2,3,4];
    /**
     *
     */
    constructor() {

    }
    setLabel( labels:string[] ){
        this.labels= labels
    }
    getDataGrafica(){
        return [
            { data: this.valores, label: 'Ventas' }    
        ]
    }

    incrementarValores( opcion: number, valor:number){
        
        this.valores[opcion] += valor;            
        return this.getDataGrafica();    
    }


    // incrementarValores( mes: string, valor:number){
    //         mes = mes.toLowerCase().trim();        
    //         for( let i in this.meses ){
    //             if( this.meses[i] === mes ){
    //                 this.valores[i] += valor;
    //             }
    //         }
    //     return this.getDataGrafica();    
    // }
}