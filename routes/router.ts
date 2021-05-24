import { Router, Request, Response } from "express";
import Server from '../classes/server';


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