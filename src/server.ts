import express from "express";
import "dotenv/config";
import { connectDB, client } from "./db";
import pagesRoutes from "./routes/pages";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB().then(() => {
  console.log("🚀 Base de datos lista");

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});

// RUTAS
app.use("/pages", pagesRoutes);

// Manejo de cierre del servidor
process.on("SIGINT", async () => {
  console.log("🛑 Cerrando conexión a MongoDB...");
  await client.close();
  process.exit(0);
});
