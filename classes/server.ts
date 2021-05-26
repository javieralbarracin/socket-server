import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server{
    
    private static _instance:Server;

    public app: express.Application;
    public port:number;
    public io: socketIO.Server;
    private httpServer: http.Server;
    /**
     *Constructor privado para 
     Generar esta clase en funcion del patron singleton
     */
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server( this.httpServer, { cors: { origin: true, credentials: true } } );

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || ( this._instance = new this );
    }

    private escucharSockets(){
        //console.log('Escuchando conexiones - sockets');
        // Escuchar cuando alguien se conecta
        this.io.on('connection', cliente =>{

            // Conectar cliente
            socket.conectarCliente( cliente);
            
            // Config Mapas
            socket.mapaSockets( cliente, this.io );

            // Config Usuarios
            socket.configurarUsuario( cliente, this.io );

            // Obtener Usuarios Activos
            socket.obtenerUsuarios( cliente, this.io );

            // Mensajes
            socket.mensaje( cliente, this.io );

            // Desconectar
            socket.desconectar( cliente, this.io );
        })

    }

    start( callback : any ){
        this.httpServer.listen( this.port, callback );
    }
}