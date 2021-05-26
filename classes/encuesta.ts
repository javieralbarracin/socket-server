export class EncuentaData{
    private preguntas : string[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
    private unidades : number[]=[ 1, 2, 3, 4 ];

    /**
     *
     */
    constructor() {}

    getDataEncuestas(){
        return [
            { data: this.unidades, label: 'Preguntas' }    
        ];
    }

    incrementarValores( nroPregunta: number, valor:number){
        for (const [i, value] of this.preguntas.entries()) {
            //console.log('%d: %s', i, value);
            if(i === nroPregunta ){
                this.unidades[i] += valor;
            }
        }        
        return this.getDataEncuestas();    
    }
}