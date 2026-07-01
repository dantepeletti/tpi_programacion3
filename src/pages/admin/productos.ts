import {
    obtenerProductosAdmin,
    eliminarProducto,
    agregarProducto,
    editarProducto
} from "../../services/productoService.js";

import {
    obtenerCategoriasAdmin
} from "../../services/categoriaService.js";

import {
    renderProductosAdmin
} from "../../components/productoAdminComponent.js";

const formulario =
    document.querySelector<HTMLFormElement>("#formProducto");

const inputId =
    document.querySelector<HTMLInputElement>("#id");

const inputNombre =
    document.querySelector<HTMLInputElement>("#nombre");

const inputPrecio =
    document.querySelector<HTMLInputElement>("#precio");

const inputStock =
    document.querySelector<HTMLInputElement>("#stock");

const inputDescripcion =
    document.querySelector<HTMLTextAreaElement>("#descripcion");

const inputImagen =
    document.querySelector<HTMLInputElement>("#imagen");

const selectCategoria =
    document.querySelector<HTMLSelectElement>("#categoria");

async function cargarCategorias(): Promise<void> {

    if (!selectCategoria) {

        return;

    }

    const categorias =
        await obtenerCategoriasAdmin();

    selectCategoria.innerHTML = "";

    categorias.forEach(categoria => {

        selectCategoria.innerHTML += `

            <option value="${categoria.id}">
                ${categoria.nombre}
            </option>

        `;

    });

}

async function actualizarVista(): Promise<void> {

    const productos =
        await obtenerProductosAdmin();

    renderProductosAdmin(productos);

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

                await eliminarProducto(id);

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

                const productos =
                    await obtenerProductosAdmin();

                const producto =
                    productos.find(
                        producto => producto.id === id
                    );

                if (!producto) {

                    return;

                }

                inputId!.value =
                    producto.id.toString();

                inputNombre!.value =
                    producto.nombre;

                inputPrecio!.value =
                    producto.precio.toString();

                inputStock!.value =
                    producto.stock.toString();

                inputDescripcion!.value =
                    producto.descripcion;

                inputImagen!.value =
                    producto.imagen;

                if (selectCategoria) {

                    selectCategoria.value =
                        producto.categoria.id.toString();

                }

            });

        });

}

formulario?.addEventListener("submit", async (event) => {

    event.preventDefault();

    const productos =
        await obtenerProductosAdmin();

    const categorias =
        await obtenerCategoriasAdmin();

    const categoriaSeleccionada =
        categorias.find(
            categoria =>
                categoria.id ===
                Number(selectCategoria?.value)
        );

    if (!categoriaSeleccionada) {

        alert("Seleccione una categoría.");

        return;

    }

    const id =
        Number(inputId?.value);

    const producto = {

        id:
            id || (
                productos.length === 0
                    ? 1
                    : Math.max(
                        ...productos.map(
                            producto => producto.id
                        )
                    ) + 1
            ),

        nombre:
            inputNombre!.value,

        precio:
            Number(inputPrecio!.value),

        stock:
            Number(inputStock!.value),

        descripcion:
            inputDescripcion!.value,

        imagen:
            inputImagen!.value,

        disponible: true,

        categoria:
            categoriaSeleccionada

    };

    if (id) {

        await editarProducto(producto);

    } else {

        await agregarProducto(producto);

    }

    formulario.reset();

    if (inputId) {

        inputId.value = "";

    }

    if (selectCategoria) {

        selectCategoria.selectedIndex = 0;

    }

    actualizarVista();

});

async function iniciar(): Promise<void> {

    await cargarCategorias();

    await actualizarVista();

}

iniciar();