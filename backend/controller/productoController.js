import {Producto} from '../models/producto.js';
export const crearProducto = async (req, res)=>{
    const body = req.body;
    const newProducto = new Producto(body);
    try{
        const savedProducto = await newProducto.save();
        res.status(200).json(savedProducto);
    } catch(error){
        res.status(400).send(error);
    }
}
export const getProductos = async (req, res)=>{
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch(error){
        res.status(500).send(error);
    }
}
export const getProducto = async (req, res)=>{
    const id = req.params.id;
    try{
        const producto = await Producto.findById(id);
        if(!producto){
            return res.status(404).json({ msg: "No se pudo encontrar el producto" });
        }
        res.json(producto);
    }
    catch(error){
        res.status(500).send(error);
    }
};

export const updateProducto = async (req, res) => {
    const id = req.params.id; 
    try {
      const producto = await Producto.findById(id); 
      if (!producto) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }
      producto.nombre = req.body.nombre || post.nombre;
      producto.precio = req.body.precio || post.precio;
      producto.descripcion = req.body.descripcion || post.descripcion;
  
      const savedProducto = await producto.save();
      res.json(savedProducto); 
    } catch (error) {
      res.status(500).send(error); 
    }
  };
  
  export const deleteProducto = async (req, res) => {
    const id = req.params.id; 
    try {
      const post = await Producto.findByIdAndDelete(id);
      if (!post) {
        return res.status(404).json({ msg: "Producto no encontrado" });
      }
      res.json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).send(error); 
    }
  };