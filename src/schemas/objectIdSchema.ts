import { z } from "zod";
import { ObjectId } from "mongodb";
export default  z.string().refine((val) => ObjectId.isValid(val), {
    message: "El _id debe ser un ObjectId válido",
});