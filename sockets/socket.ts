import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuarioLista } from '../classes/usuarios-lista';
import { Usuario } from "../classes/usuario";

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

// Grafica


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
