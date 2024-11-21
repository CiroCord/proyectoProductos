import mongoose from "mongoose";
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    nombre: String,
    precio: { type: Number, required: true },
    descripcion: String
})

export const Producto = mongoose.model('Producto', ProductoSchema);
