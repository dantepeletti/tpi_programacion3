import {obtenerCategoriasAdmin, agregarCategoria, editarCategoria, eliminarCategoria } from "../../services/categoriaService.js";
import {renderCategoriasAdmin} from "../../components/categoriaAdminComponent.js";

const formulario =
    document.querySelector<HTMLFormElement>("#formCategoria");

const inputId =
    document.querySelector<HTMLInputElement>("#id");

const inputNombre =
    document.querySelector<HTMLInputElement>("#nombre");

const inputDescripcion =
    document.querySelector<HTMLTextAreaElement>("#descripcion");

async function actualizarVista(): Promise<void> {

    const categorias =
        await obtenerCategoriasAdmin();

    renderCategoriasAdmin(categorias);

    agregarEventos();

}

function agregarEventos(): void {

    document
        .querySelectorAll(".btn-eliminar")
        .forEach(boton => {

            boton.addEventListener("click", async () => {

                const id = Number(
                    boton.getAttribute("data-id")
                );

                await eliminarCategoria(id);

                actualizarVista();

            });

        });

    document
        .querySelectorAll(".btn-editar")
        .forEach(boton => {

            boton.addEventListener("click", async () => {

                const id = Number(
                    boton.getAttribute("data-id")
                );

                const categorias =
                    await obtenerCategoriasAdmin();

                const categoria =
                    categorias.find(
                        categoria => categoria.id === id
                    );

                if (!categoria) {

                    return;

                }

                inputId!.value =
                    categoria.id.toString();

                inputNombre!.value =
                    categoria.nombre;

                inputDescripcion!.value =
                    categoria.descripcion;

            });

        });

}

formulario?.addEventListener("submit", async (event) => {

    event.preventDefault();

    const categorias =
        await obtenerCategoriasAdmin();

    const id =
        Number(inputId?.value);

    const categoria = {

        id:
            id || (
                categorias.length === 0
                    ? 1
                    : Math.max(
                        ...categorias.map(
                            categoria => categoria.id
                        )
                    ) + 1
            ),

        nombre:
            inputNombre!.value,

        descripcion:
            inputDescripcion!.value

    };

    if (id) {

        await editarCategoria(categoria);

    } else {

        await agregarCategoria(categoria);

    }

    formulario.reset();

    if (inputId) {

        inputId.value = "";

    }

    actualizarVista();

});

actualizarVista();