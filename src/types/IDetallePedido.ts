import type { IProducto } from "./IProducto.js";

export interface IDetallePedido {
    cantidad: number;
    subtotal: number;
    producto: IProducto;
}