import { Request, Response } from "express";
import { generateToken, hashPassword, comparePasswords } from "@/services/authService";
import { connectDB } from "@/db";

class AuthController{
    static async register(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const db = await connectDB();
            const users = db.collection("users");
    
            // Verifica si el usuario ya existe
            const existingUser = await users.findOne({ email });
            if (existingUser) return res.status(400).json({ message: "Usuario ya registrado" });
    
            // Encripta la contraseña y guarda el usuario
            const hashedPassword = await hashPassword(password);
            await users.insertOne({ email, password: hashedPassword });
    
            res.status(201).json({ message: "Usuario registrado" });
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
    
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const db = await connectDB();
            const users = db.collection("users");
    
            // Verifica si el usuario existe
            const user = await users.findOne({ email });
            if (!user) return res.status(400).json({ message: "Credenciales inválidas" });
    
            // Verifica la contraseña
            const isValid = await comparePasswords(password, user.password);
            if (!isValid) return res.status(400).json({ message: "Credenciales inválidas" });
    
            // Genera y envía el token
            const token = generateToken(user._id.toString());
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
}

export default AuthController;

