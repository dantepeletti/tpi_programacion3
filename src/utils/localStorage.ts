import type { IUser } from "../types/IUser.js";

/**
 * Guarda cualquier dato en localStorage.
 */
export function guardarDatos<T>(
    key: string,
    datos: T
): void {

    localStorage.setItem(
        key,
        JSON.stringify(datos)
    );

}

/**
 * Obtiene cualquier dato de localStorage.
 */
export function obtenerDatos<T>(
    key: string
): T | null {

    const datos = localStorage.getItem(key);

    if (!datos) {
        return null;
    }

    return JSON.parse(datos);

}

/**
 * Guarda el usuario logueado.
 */
export function saveUser(user: IUser): void {

    guardarDatos("userData", user);

}

/**
 * Obtiene el usuario logueado.
 */
export function getUser(): IUser | null {

    return obtenerDatos<IUser>("userData");

}

/**
 * Elimina el usuario logueado.
 */
export function removeUser(): void {

    localStorage.removeItem("userData");

}