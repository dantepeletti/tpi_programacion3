import type { IProducto } from "./IProducto.js";

export interface ICarritoItem {
    producto: IProducto;
    cantidad: number;
}