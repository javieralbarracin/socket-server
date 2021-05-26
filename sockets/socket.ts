import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";
import { Mapa } from "../classes/mapa";
import { Marcador } from '../classes/marcador';

export const usuariosConectados = new UsuarioLista()

// desconexion del cliente con el socket-server
export const desconectar = ( cliente:Socket, io: socketIO.Server ) =>{
    cliente.on('disconnect', ()=>{
        //console.log('Cliente desconectado')
        usuariosConectados.borrarUsuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectados.obtenerTodos() ); 
    })
}
// Conexion del cliente con el socket-server
export const conectarCliente = (client: Socket) =>{

   const usuario = new Usuario(client.id);
   usuariosConectados.agregar(usuario); 

   
}

// Eventos de mapa
//marcador-nuevo
export const mapa = new Mapa();
export const mapaSockets = ( cliente:Socket, io: socketIO.Server ) =>{
    cliente.on('marcador-nuevo', ( marcador:Marcador) => {
        
        mapa.agregarMarcador(marcador)
        // broadcast para emitir a todos los usuarios conectados 
        // menos al que envió el marcador
        cliente.broadcast.emit('marcador-nuevo', marcador);
    })
    cliente.on('marcador-borrar', ( id:string) => {
        
        mapa.borrarMarcador(id)
        // broadcast para emitir a todos los usuarios conectados 
        // menos al que envió el marcador
        cliente.broadcast.emit('marcador-borrar', id);
    })
    cliente.on('marcador-mover', ( marcador:Marcador) => {
        
        mapa.moverMarcador(marcador)
        // broadcast para emitir a todos los usuarios conectados 
        // menos al que envió el marcador
        cliente.broadcast.emit('marcador-mover', marcador);
    })
}

// Mensajes
export const mensaje = ( cliente:Socket, io: socketIO.Server) =>{

    cliente.on('mensaje', ( payload: {de:string, cuerpo:string} )=>{
        // para emitir algo a los usarios conectados
        io.emit('mensaje-nuevo', payload); 
    });    
}

// Configurar usuarios
export const configurarUsuario = ( cliente:Socket, io: socketIO.Server) =>{

    cliente.on('configurar-usuario', ( payload: { nombre:string }, callback:Function )=>{
        //console.log('cliente-->',cliente.id)

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        io.emit('usuarios-activos', usuariosConectados.obtenerTodos() ); 

        callback({
            ok:true,
            msg:`Usuario ${payload.nombre} configurado`
        })

    });

}
// obtener usuarios 
export const obtenerUsuarios = ( cliente:Socket, io: socketIO.Server) =>{

    cliente.on('obtener-usuarios', () => {
        
        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.obtenerTodos() );

    });

}
