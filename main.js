// Definir la clase Producto con las propiedades categoria, nombre, precio y existencia
class Producto {
    constructor(categoria, nombre, precio, existencia) {
        this.categoria = categoria;
        this.nombre = nombre;
        this.precio = precio;
        this.existencia = existencia;
    }
}

// Crear tres objetos Producto para representar una pizza, una soda y un helado
let pizza = new Producto("Comida", "Pizza", 10, 5);
let soda = new Producto("Bebida", "Soda", 2, 10);
let helado = new Producto("Postre", "Helado", 5, 3);

// Crear un array productos que contenga los objetos Producto creados anteriormente
let productos = [pizza, soda, helado];

// Crear un objeto carrito para almacenar los productos agregados por el usuario
let carrito = {};

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    event.preventDefault();
    const form = event.target;
    const productoNombre = form.dataset.nombre;
    const cantidad = parseInt(form.elements.cantidad.value);
    const producto = productos.find((producto) => producto.nombre === productoNombre);
    if (producto.existencia >= cantidad) {
        if (carrito[producto.nombre]) {
            carrito[producto.nombre].cantidad += cantidad;
        } else {
            carrito[producto.nombre] = {
                categoria: producto.categoria,
                precio: producto.precio,
                cantidad: cantidad,
            };
        }
        producto.existencia -= cantidad;
        console.log(`Se ha agregado ${cantidad} ${producto.nombre} al carrito.`);
    } else {
        console.log(`Lo siento, no hay suficiente stock de ${producto.nombre} para agregar ${cantidad} al carrito.`);
    }
}

// Función para procesar el pago
function procesarPago(metodoPago) {
    let total = 0;
    for (let producto in carrito) {
        total += carrito[producto].precio * carrito[producto].cantidad;
    }
    console.log(`El total de la compra es: $${total}.`);
    if (metodoPago === "en linea") {
        console.log("El pago se ha procesado en línea.");
    } else if (metodoPago === "en persona") {
        let horaRecogida = prompt("Ingrese la hora a la que va a recoger su pedido (en formato hh:mm):");
        console.log(`Su pedido estará listo para recoger a las ${horaRecogida}.`);
    }
}

// Agregar un listener de evento al botón "Agregar al carrito" de cada producto
let botonesAgregar = document.querySelectorAll(".agregar");
botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
        const productoNombre = event.target.dataset.nombre;
        const producto = productos.find((producto) => producto.nombre === productoNombre);
        const form = document.createElement("form");
        form.dataset.nombre = productoNombre;
        form.addEventListener("submit", agregarAlCarrito);
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.name = "cantidad"; // Agregar el atributo "name" al input
        inputCantidad.min = "1"; // Agregar el atributo "min" al input
        inputCantidad.value = "1"; // Establecer el valor inicial del input en 1
        const labelCantidad = document.createElement("label");
        labelCantidad.textContent = "Cantidad: ";
        labelCantidad.appendChild(inputCantidad);
        const botonAgregar = document.createElement("button");
        botonAgregar.type = "submit";
        botonAgregar.textContent = "Agregar al carrito";
        form.appendChild(labelCantidad);
        form.appendChild(botonAgregar);
        const productosEl = document.querySelector(".productos");
        productosEl.appendChild(form);
    });
});

