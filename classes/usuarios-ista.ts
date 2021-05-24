import { Usuario } from './usuario';
export class UsuarioLista{

    private lista:Usuario[]=[];

    /**
     *
     */
    constructor() {        
        
    }
    // Agregar un usuario
    public agregar(usuario:Usuario):Usuario{
        this.lista.push(usuario);
        //console.log(this.lista);
        return usuario
    }
    // Actualizar el nombre del usuario
    public actualizarNombre(id:string, nombre:string){
        for (let usuario of this.lista) {
            
            if(usuario.id === id){
                usuario.nombre=nombre;
                break;
            }
            
        }
        // console.log('===========nombre actualizado=============');
        // console.log(this.lista);
    }

    // Obtener todos los usuarios
    public obtenerTodos():Usuario[]{
        return this.lista;
    }

    // Obtener un usuario
    public obtenerUsuario(id:string){
        return this.lista.find( u => u.id === id );
    }

    // Obtener usuarios de una sala en particular
    public obtenerUsuariosEnSala(sala:string){
        return this.lista.filter( u => u.sala === sala );
    }
    // Borrar usuario
    public borrarUsuario(id:string){
        const tempUsuario = this.obtenerUsuario(id);
        this.lista = this.lista.filter(u => u.id !== id);
        return tempUsuario
    }
}