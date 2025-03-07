import type { ObjectId } from "mongodb";
export default interface Page {
    _id?: ObjectId;
    nombre: string;
    url: string;
    type: "https" | "http";
    descripcion: string;
    icono: string;
}