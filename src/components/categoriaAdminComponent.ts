import type { ICategoria } from "../types/ICategoria.js";

export function renderCategoriasAdmin(
    categorias: ICategoria[]
): void {

    const contenedor =
        document.querySelector<HTMLDivElement>("#listaCategorias");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    categorias.forEach(categoria => {

        contenedor.innerHTML += `

            <article class="categoria-admin">

                <h3>
                    ${categoria.nombre}
                </h3>

                <p>
                    ${categoria.descripcion}
                </p>

                <button
                    class="btn-editar"
                    data-id="${categoria.id}">
                    Editar
                </button>

                <button
                    class="btn-eliminar"
                    data-id="${categoria.id}">
                    Eliminar
                </button>

            </article>

            <hr>

        `;

    });

}