import type { ICategoria } from "../types/ICategoria.js";
import { guardarDatos, obtenerDatos } from "../utils/localStorage.js";

const CATEGORIAS_KEY = "categorias";

export async function getCategorias(): Promise<ICategoria[]> {

    const categoriasStorage =
        obtenerDatos<ICategoria[]>(CATEGORIAS_KEY);

    if (categoriasStorage) {

        return categoriasStorage;

    }

    const response =
        await fetch("/data/categorias.json");

    if (!response.ok) {

        throw new Error(
            "No se pudieron cargar las categorías."
        );

    }

    const categorias: ICategoria[] =
        await response.json();

    guardarDatos(
        CATEGORIAS_KEY,
        categorias
    );

    return categorias;

}

export async function obtenerCategoriasAdmin(): Promise<ICategoria[]> {

    return await getCategorias();

}

export function guardarCategorias(
    categorias: ICategoria[]
): void {

    guardarDatos(
        CATEGORIAS_KEY,
        categorias
    );

}

export async function agregarCategoria(
    categoria: ICategoria
): Promise<void> {

    const categorias =
        await obtenerCategoriasAdmin();

    categorias.push(categoria);

    guardarCategorias(categorias);

}

export async function eliminarCategoria(
    id: number
): Promise<void> {

    const categorias =
        await obtenerCategoriasAdmin();

    const nuevasCategorias =
        categorias.filter(
            categoria => categoria.id !== id
        );

    guardarCategorias(nuevasCategorias);

}

export async function editarCategoria(
    categoriaEditada: ICategoria
): Promise<void> {

    const categorias =
        await obtenerCategoriasAdmin();

    const indice =
        categorias.findIndex(
            categoria =>
                categoria.id === categoriaEditada.id
        );

    if (indice === -1) {

        return;

    }

    categorias[indice] =
        categoriaEditada;

    guardarCategorias(categorias);

}