import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET;
// Función para generar un token JWT
export function generateToken(userId: string) {
    if (!SECRET_KEY) {
        throw new Error("JWT secret is not defined");
    }
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "1h" });
}

// Función para encriptar contraseñas
export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

// Función para comparar contraseñas en login
export async function comparePasswords(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
}
