import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { mapa, usuariosConectados } from '../sockets/socket';
import { GraficaData } from '../classes/grafica';
import { EncuentaData } from '../classes/encuesta';
import { Mapa } from "../classes/mapa";


export const router = Router();
// ============== Gestion de Marcadores para el mapa ===========

router.get('/mapa', (req: Request, res: Response)=>{
    res.json( mapa.getMarcadores() )
})
// Modificacion de Grafica y envio del cambio a los usuarios conectados
// router.post('/mapa', (req: Request, res: Response)=>{

//     const opcion = Number(req.body.opcion);
//     const unidades = Number(req.body.unidades);

//     grafica.incrementarValores( opcion, unidades );

//     const server = Server.instance;
//     server.io.emit('cambio-grafica', grafica.getDataGrafica())

//     res.json( grafica.getDataGrafica())

// })
// ============== FIN Gestion de Marcadores para el mapa ===========



// ============== Gestion de Encuesta
/***
 * Estos metodos no hacen falta ya que se reutilizó el metodo de grafica
 * con la clase grafica.
 * 
 */

// const encuesta = new EncuentaData();
// // Obtencion de encuesta
// router.get('/encuesta', (req: Request, res: Response)=>{
//     res.json( encuesta.getDataEncuestas() )
// })
// Modificacion de Encuesta y envio del cambio a los usuarios conectados
// router.post('/encuesta', (req: Request, res: Response)=>{

//     const nroPregunta = Number(req.body.nroPregunta);
//     const unidades = req.body.unidades;

//     encuesta.incrementarValores( nroPregunta, Number(unidades) );

//     const server = Server.instance;
//     server.io.emit('cambio-encuesta', encuesta.getDataEncuestas())

//     res.json( encuesta.getDataEncuestas())

// })
// ============== FIN Gestion de Encuesta ===================

// ============== Gestion de Grafica ========================
const grafica = new GraficaData();
router.get('/grafica', (req: Request, res: Response)=>{
    res.json( grafica.getDataGrafica() )
})
// Modificacion de Grafica y envio del cambio a los usuarios conectados
router.post('/grafica', (req: Request, res: Response)=>{

    const opcion = Number(req.body.opcion);
    const unidades = Number(req.body.unidades);

    grafica.incrementarValores( opcion, unidades );

    const server = Server.instance;
    server.io.emit('cambio-grafica', grafica.getDataGrafica())

    res.json( grafica.getDataGrafica())

})
// ============== FIN Gestion de Grafica ========================
router.post('/mensajes', (req: Request, res: Response)=>{
    const cuerpo= req.body.cuerpo;
    const de = req.body.de;
    //======= msg a todas las salas
    const payload = { de,cuerpo }
    const server = Server.instance;

    server.io.emit( 'mensaje-nuevo',payload )
    //======= FIN msg a todas las salas =============
    res.json({
        ok:true,
        cuerpo
    })
})

router.post('/mensajes/:id', (req: Request, res: Response)=>{
    const cuerpo= req.body.cuerpo;
    const de = req.body.de;
    const id = req.params['id'];

    //======= msg a un usuario de la sala
    const payload = { de,cuerpo }
    const server = Server.instance;
    server.io.in( id ).emit( 'mensaje-privado',payload )
    //======= FIN msg =============
    res.json({
        ok:true,
        cuerpo,
        id
    })
})
//========== ruta para obtener los usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;
    server.io.allSockets().then((clientes)=>{
        res.json({
            ok:true,
           // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            err
        })
    });

});

router.get('/usuarios/detalles', (req: Request, res: Response) => {

    res.json({
        ok:false,
        clientes: usuariosConectados.obtenerTodos()
    })
});

//========== FIN rutas

// export default router;