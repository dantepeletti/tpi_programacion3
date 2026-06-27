import type { Rol } from "./Rol.js";

export interface IUser {
    id: number;
    nombre: string;
    apellido: string;
    mail: string;
    celular: string;
    password: string;
    rol: Rol;
}