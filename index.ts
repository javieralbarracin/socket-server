/**
 * 
 * Comando para iniciar con node: 
 * tsc -w (para iniciar en modo observador)
 * npm start o nodemon dist/
 * 
 */

import Server from "./classes/server";
import { router } from './routes/router';

import cors from 'cors';

import bodyParser from 'body-parser';

const server = Server.instance;

// tiene que ser antes de la config de las rutas
server.app.use( bodyParser.urlencoded({ extended:true }) );
server.app.use( bodyParser.json())

// Cors
server.app.use( cors({ origin:true, credentials: true }));

// Rutas de servicio
server.app.use('/', router)

server.start( ()=>{
    console.log(`Server corriendo en el puerto-->${ server.port }`)
})