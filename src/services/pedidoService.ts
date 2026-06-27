import type { IPedido } from "../types/IPedido.js";

export async function getPedidos(): Promise<IPedido[]> {
    const response = await fetch("/data/pedidos.json");

    if (!response.ok) {
        throw new Error("No se pudieron cargar los pedidos.");
    }

    return await response.json();
}