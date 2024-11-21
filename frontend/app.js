
const API_URL = `http://localhost:10000/api/productoscord`;

async function fetchProductos() {
    try {
        console.log("Llamando a:", API_URL); // Añade este log para verificar la URL

        const response = await fetch(API_URL);
        console.log('Response status:', response.status); // Muestra el código de estado de la respuesta

        // Revisa el cuerpo de la respuesta para ver si los datos son correctos
        const data = await response.json();
        console.log("Datos recibidos:", data);

        if (!response.ok) throw new Error("Error al obtener productos");
        renderProductos(data);
    } catch (error) {
        console.error("Error en fetchProductos:", error);
    }
}
function renderProductos(productos) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.innerHTML = `
       <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <button onclick="mostrarFormularioEdicion('${producto._id}')">Editar</button>
            <button onclick="eliminarProducto('${producto._id}')">Eliminar</button>
            
            <!-- Formulario de edición oculto -->
            <form id="form-editar-${producto._id}" class="form-editar" style="display: none;">
                <input type="text" id="editar-nombre-${producto._id}" value="${producto.nombre}" />
                <textarea id="editar-descripcion-${producto._id}">${producto.descripcion}</textarea>
                <input type="number" id="editar-precio-${producto._id}" value="${producto.precio}" />
                <button type="button" onclick="guardarEdicion('${producto._id}')">Guardar</button>
                <button type="button" onclick="cancelarEdicion('${producto._id}')">Cancelar</button>
            </form>
        `;
        container.appendChild(div);
    });
}

fetchProductos();

function mostrarFormularioEdicion(id) {
    document.getElementById(`form-editar-${id}`).style.display = 'flex';
}

function cancelarEdicion(id) {
    document.getElementById(`form-editar-${id}`).style.display = 'none';
}
async function guardarEdicion(id) {
    const nombre = document.getElementById(`editar-nombre-${id}`).value;
    const descripcion = document.getElementById(`editar-descripcion-${id}`).value;
    const precio = document.getElementById(`editar-precio-${id}`).value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, descripcion, precio: parseFloat(precio) })
        });
        if (!response.ok) throw new Error("Error al editar producto");

        fetchProductos(); // Actualiza la lista de productos
    } catch (error) {
        console.error("Error al editar producto:", error);
    }
}

async function eliminarProducto(id) {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error("Error al eliminar el producto");
        
        fetchProductos();
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('form-agregar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });
        if (!response.ok) throw new Error("Error al agregar producto");
        
        fetchProductos(); // Actualiza la lista de productos
        document.getElementById('form-agregar').reset();
    } catch (error) {
        console.error(error);
        alert("No se pudo agregar el producto");
    }
});


async function obtenerProducto(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener producto");
    return await response.json();
}
