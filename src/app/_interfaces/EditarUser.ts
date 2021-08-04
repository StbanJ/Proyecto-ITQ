export class UsuarioEditar {
    id: string;
    PrimerNombre: string;
    SegundoNombre: string;
    PrimerApellido: string;
    SegundoApellido: string;
    nickname: string;
    email: string;
    estado: string;

    constructor(PrimerNombre: string, SegundoNombre: string, PrimerApellido: string,
        SegundoApellido: string, nickname: string, email: string, estado: string) {
        this.PrimerNombre = PrimerNombre;
        this.SegundoNombre = SegundoNombre;
        this.PrimerApellido = PrimerApellido;
        this.SegundoApellido = SegundoApellido;
        this.nickname = nickname;
        this.email = email;
        this.estado = estado;
        }
    
}