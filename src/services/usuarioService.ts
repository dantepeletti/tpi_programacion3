import type { IUser } from "../types/IUser.js";
import { guardarDatos, obtenerDatos } from "../utils/localStorage.js";

const USUARIOS_KEY = "usuarios";

export async function inicializarUsuarios(): Promise<void> {

    const usuariosStorage =
        obtenerDatos<IUser[]>(USUARIOS_KEY);

    if (usuariosStorage) return;

    const response = await fetch("/data/usuarios.json");

    if (!response.ok) {

        throw new Error(
            "No se pudieron cargar los usuarios."
        );

    }

    const usuarios: IUser[] =
        await response.json();

    guardarDatos(USUARIOS_KEY, usuarios);

}

export function obtenerUsuarios(): IUser[] {

    return obtenerDatos<IUser[]>(USUARIOS_KEY) ?? [];

}

export function guardarUsuarios(
    usuarios: IUser[]
): void {

    guardarDatos(USUARIOS_KEY, usuarios);

}

export function buscarUsuario(
    mail: string,
    password: string
): IUser | undefined {

    return obtenerUsuarios().find(

        usuario =>

            usuario.mail === mail &&
            usuario.password === password

    );

}

export function registrarUsuario(
    usuario: IUser
): void {

    const usuarios = obtenerUsuarios();

    usuarios.push(usuario);

    guardarUsuarios(usuarios);

}