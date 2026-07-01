import type { IUser } from "../types/IUser.js";
import { obtenerDatos } from "./localStorage.js";

const USER_KEY = "userData";

export function getUsuarioLogueado(): IUser | null {

    return obtenerDatos<IUser>(USER_KEY);

}

export function estaAutenticado(): boolean {

    return getUsuarioLogueado() !== null;

}

export function esAdmin(): boolean {

    const usuario = getUsuarioLogueado();

    return usuario?.rol === "ADMIN";

}

export function cerrarSesion(): void {

    localStorage.removeItem(USER_KEY);

}