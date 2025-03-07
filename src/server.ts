import express from "express";
import "dotenv/config";
import { connectDB, client } from "./db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
  console.log("🚀 Base de datos lista");

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

// Manejo de cierre del servidor
process.on("SIGINT", async () => {
  console.log("🛑 Cerrando conexión a MongoDB...");
  await client.close();
  process.exit(0);
});
