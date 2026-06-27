import type { ICategoria } from "../types/ICategoria.js";

export function renderCategorias(categorias: ICategoria[]): void {

    const listaCategorias = document.querySelector<HTMLUListElement>("#listaCategorias");

    if (!listaCategorias) return;

    listaCategorias.innerHTML = "";

    categorias.forEach((categoria) => {

        const li = document.createElement("li");

        li.textContent = categoria.nombre;
        li.dataset.id = categoria.id.toString();

        listaCategorias.appendChild(li);

    });

}