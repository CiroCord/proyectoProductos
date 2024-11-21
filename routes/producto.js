import { Router } from "express";
import{
    crearProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto
} from '../controller/productoController.js';

const router = Router();

router.post('/', crearProducto);
router.get('/', getProductos);
router.get('/:id', getProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;