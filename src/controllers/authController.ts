import { Request, Response } from "express";
import { generateToken, hashPassword, comparePasswords } from "@/services/authService";
import UserInterface from "@/interfaces/user";
import User from "@/models/user";

class AuthController{
    static async register(req: Request, res: Response) {
        try {
            const userData: UserInterface = req.body;
            
            // Verifica si el usuario ya existe
            const existingUser = await User.findOne({ email: userData.email }) as UserInterface;
            if (existingUser) return res.status(400).json({ message: "Usuario ya registrado" });
    
            // Encripta la contraseña y guarda el usuario
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            await User.create(userData);
    
            res.status(201).json({ message: "Usuario registrado" });
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
    
    static async login(req: Request, res: Response) {
        try {
            const userData: UserInterface = req.body;
            // Verifica si el usuario existe
            const user = await User.findOne({ email: userData.email }) as UserInterface;
            if (!user) return res.status(400).json({ message: "Credenciales inválidas" });
    
            // Verifica la contraseña
            const isValid = await comparePasswords(userData.password, user.password);
            if (!isValid) return res.status(400).json({ message: "Credenciales inválidas" });
    
            // Genera y envía el token
            const token = (user._id) ? generateToken(user._id.toString()) : "Error al generar token";
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: "Error en el servidor" });
        }
    }
}

export default AuthController;

