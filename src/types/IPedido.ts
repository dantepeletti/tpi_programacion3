import type { EstadoPedido } from "./EstadoPedido.js";
import type { FormaPago } from "./FormaPago.js";
import type { IDetallePedido } from "./IDetallePedido.js";
import type { IUser } from "./IUser.js";

export interface IPedido {
    id: number;
    fecha: string;
    estado: EstadoPedido;
    total: number;
    formaPago: FormaPago;
    detalles: IDetallePedido[];
    usuarioDto: Omit<IUser, "password">;
}