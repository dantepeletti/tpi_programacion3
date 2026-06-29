import type { IPedido } from "../types/IPedido.js";
import {guardarDatos, obtenerDatos } from "../utils/localStorage.js";

const PEDIDOS_KEY = "pedidos";

export async function getPedidos(): Promise<IPedido[]> {

    const pedidosStorage =
        obtenerDatos<IPedido[]>(PEDIDOS_KEY);

    if (pedidosStorage) {

        return pedidosStorage;

    }

    const response =
        await fetch("/data/pedidos.json");

    if (!response.ok) {

        throw new Error(
            "No se pudieron cargar los pedidos."
        );

    }

    const pedidos: IPedido[] =
        await response.json();

    guardarDatos(PEDIDOS_KEY, pedidos);

    return pedidos;

}

export function guardarPedido(
    pedido: IPedido
): void {

    const pedidos =
        obtenerDatos<IPedido[]>(PEDIDOS_KEY) ?? [];

    pedidos.push(pedido);

    guardarDatos(PEDIDOS_KEY, pedidos);

}