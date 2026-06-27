import type { ICategoria } from "../types/ICategoria.js";

export async function getCategorias(): Promise<ICategoria[]> {
    const response = await fetch("/data/categorias.json");

    if (!response.ok) {
        throw new Error("No se pudieron cargar las categorías.");
    }

    return await response.json();
}