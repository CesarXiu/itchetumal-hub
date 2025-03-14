import z from 'zod';
import objectIdSchema from './objectIdSchema';

export default z.object({
    _id: objectIdSchema.optional(), // Opcional
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    url: z.string().url("Debe ser una URL válida"),
    type: z.enum(["https", "http"]), // Solo acepta estos dos valores
    descripcion: z.string().min(5, "La descripción debe tener al menos 5 caracteres"),
    icono: z.string().url("El icono debe ser una URL válida"),
});