import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-ista';
import { Usuario } from "../classes/usuario";

export const usuariosConectados = new UsuarioLista()


export const desconectar = ( cliente:Socket ) =>{
    cliente.on('disconnect', ()=>{
        //console.log('Cliente desconectado')
        usuariosConectados.borrarUsuario(cliente.id);

    })
}

export const conectarCliente = (client: Socket) =>{

   const usuario = new Usuario(client.id);
   usuariosConectados.agregar(usuario); 
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
        console.log('cliente-->',cliente.id)
        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        callback({
            ok:true,
            msg:`Usuario ${payload.nombre} configurado`
        })
    });

}
