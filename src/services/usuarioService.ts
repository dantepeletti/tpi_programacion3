import type { IUser } from "../types/IUser.js";

export async function getUsuarios(): Promise<IUser[]> {
    const response = await fetch("/data/usuarios.json");

    if (!response.ok) {
        throw new Error("No se pudieron cargar los usuarios.");
    }

    return await response.json();
}