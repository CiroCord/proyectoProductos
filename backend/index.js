import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import productoRoutes from './routes/producto.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Usamos CORS
app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen (cambia esto si es necesario)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-type', 'Authrization']   
}));

app.use(express.json());

app.use('/api/productoscord', productoRoutes);  // Rutas de la API



async function main() {
    await mongoose.connect(process.env.DB);
}

main()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor abierto en http://localhost:${PORT}/api/productoscord`);
    });
})
.catch(err => console.error(err));
