import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';


export const router = Router();

router.get('/mensajes', (req: Request, res: Response)=>{
    res.json({
        ok:true,
        msg:'Todo esta ok'
    })
})

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