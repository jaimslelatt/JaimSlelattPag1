document.addEventListener('DOMContentLoaded', () => {
    const botonesAgregar = document.querySelectorAll('.boton-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });

    function agregarAlCarrito(event) {
        const boton = event.target;
        const nombre = boton.dataset.nombre;
        const precio = boton.dataset.precio;

        const producto = {
            nombre: nombre,
            precio: precio
        };

        agregarProductoAlCarrito(producto);
    }

    function agregarProductoAlCarrito(producto) {
        const listaCarrito = document.querySelector('#lista-carrito');
        const productosCarrito = listaCarrito.querySelectorAll('.producto-carrito');

        let productoExistente = null;

        productosCarrito.forEach(productoCarrito => {
            if (productoCarrito.dataset.nombre === producto.nombre) {
                productoExistente = productoCarrito;
            }
        });

        if (productoExistente !== null) {
            const cantidad = parseInt(productoExistente.dataset.cantidad) + 1;
            productoExistente.dataset.cantidad = cantidad;
            productoExistente.querySelector('span').textContent = `${producto.nombre} - $${producto.precio} (${cantidad})`;

            const subtotal = cantidad * parseFloat(producto.precio);
            productoExistente.querySelector('.subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        } else {

            const elementoProducto = document.createElement('li');
            elementoProducto.classList.add('producto-carrito');
            elementoProducto.dataset.nombre = producto.nombre;
            elementoProducto.dataset.precio = producto.precio;
            elementoProducto.dataset.cantidad = 1;

            const textoProducto = document.createElement('span');
            textoProducto.textContent = `${producto.nombre} - $${producto.precio} (1)`;
            elementoProducto.appendChild(textoProducto);

            const botonSumar = document.createElement('button');
            botonSumar.textContent = '+';
            botonSumar.classList.add('boton-sumar');
            botonSumar.addEventListener('click', () => sumarCantidad(elementoProducto));
            elementoProducto.appendChild(botonSumar);

            const botonRestar = document.createElement('button');
            botonRestar.textContent = '-';
            botonRestar.classList.add('boton-restar');
            botonRestar.addEventListener('click', () => restarCantidad(elementoProducto));
            elementoProducto.appendChild(botonRestar);

            const espacio = document.createElement('span');
            espacio.textContent = ' ';
            elementoProducto.appendChild(espacio);

            const subtotal = parseFloat(producto.precio);
            const subtotalSpan = document.createElement('span');
            subtotalSpan.classList.add('subtotal');
            subtotalSpan.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
            elementoProducto.appendChild(subtotalSpan);

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('boton-eliminar');
            botonEliminar.style.backgroundColor = 'red';
            botonEliminar.addEventListener('click', () => eliminarProducto(elementoProducto));
            elementoProducto.appendChild(botonEliminar);

            listaCarrito.appendChild(elementoProducto);
        }

        actualizarTotal();
    }

    function sumarCantidad(elementoProducto) {
        const cantidad = parseInt(elementoProducto.dataset.cantidad) + 1;
        elementoProducto.dataset.cantidad = cantidad;
        elementoProducto.querySelector('span').textContent = `${elementoProducto.dataset.nombre} - $${elementoProducto.dataset.precio} (${cantidad})`;

        const subtotal = cantidad * parseFloat(elementoProducto.dataset.precio);
        elementoProducto.querySelector('.subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;

        actualizarTotal();
    }

    function restarCantidad(elementoProducto) {
        const cantidad = parseInt(elementoProducto.dataset.cantidad) - 1;
        if (cantidad === 0) {
            elementoProducto.remove();
        } else {
            elementoProducto.dataset.cantidad = cantidad;
            elementoProducto.querySelector('span').textContent = `${elementoProducto.dataset.nombre} - $${elementoProducto.dataset.precio} (${cantidad})`;

         
            const subtotal = cantidad * parseFloat(elementoProducto.dataset.precio);
            elementoProducto.querySelector('.subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        }

     
        actualizarTotal();
    }

    function eliminarProducto(elementoProducto) {
        elementoProducto.remove();

    
        actualizarTotal();
    }

    function actualizarTotal() {
        const productosCarrito = document.querySelectorAll('.producto-carrito');
        let total = 0;

        productosCarrito.forEach(producto => {
            const subtotalTexto = producto.querySelector('.subtotal').textContent;
            const subtotal = parseFloat(subtotalTexto.substring(subtotalTexto.indexOf('$') + 1));
            total += subtotal;
        });

        document.getElementById('total-precio').textContent = total.toFixed(2);
    }
    const botonRealizarCompra = document.getElementById('realizar-compra');
    botonRealizarCompra.addEventListener('click', () => {
        limpiarCarrito();
        mostrarAlerta();
    });

    function limpiarCarrito() {
        const listaCarrito = document.getElementById('lista-carrito');
        listaCarrito.innerHTML = ''; 
        actualizarTotal(); 
    }

    function mostrarAlerta() {
        alert("Compra realizada con éxito. ¡Muchas gracias!");
    }
});

