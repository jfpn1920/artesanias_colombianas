/*------------------------------------------*/
/*--|funcionalidad_artesanias_colombianas|--*/
/*------------------------------------------*/
const tarjetas = document.querySelectorAll(".tarjeta");
const botonRestablecer = document.getElementById("restablecerTodo");
const mensajeGeneral = document.getElementById("mensajeGeneral");
/*-------------------------------*/
/*--|datos_iniciales_guardados|--*/
/*-------------------------------*/
const datosIniciales = {
    1: {
        nombre: "Mochila Wayuu",
        descripcion: "Mochila tejida a mano con diseños tradicionales y colores llamativos.",
        precio: 85000
    },
    2: {
        nombre: "Máscara de madera",
        descripcion: "Pieza decorativa tallada en madera con detalles inspirados en la cultura colombiana.",
        precio: 120000
    },
    3: {
        nombre: "Vasija de cerámica",
        descripcion: "Vasija decorativa elaborada artesanalmente con formas y acabados tradicionales.",
        precio: 65000
    }
};
/*---------------------------------------*/
/*--|obtener_datos_usando_localstorage|--*/
/*---------------------------------------*/
function obtenerDatos(id) {
    const datos = localStorage.getItem(`artesania_${id}`);
    if (datos) {
        return JSON.parse(datos);
    }
    return datosIniciales[id];
}
/*-----------------------*/
/*--|mostrar_los_datos|--*/
/*-----------------------*/
function mostrarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const datos = obtenerDatos(id);
    const nombre = tarjeta.querySelector(".nombre_producto");
    const descripcion = tarjeta.querySelector(".descripcion_producto");
    const precio = tarjeta.querySelector(".precio_producto");
    nombre.value = datos.nombre;
    descripcion.value = datos.descripcion;
    precio.value = datos.precio;
}
/*-----------------------*/
/*--|guardar_los_datos|--*/
/*-----------------------*/
function guardarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const nombre = tarjeta.querySelector(".nombre_producto").value.trim();
    const descripcion = tarjeta.querySelector(".descripcion_producto").value.trim();
    const precio = tarjeta.querySelector(".precio_producto").value;
    const mensaje = tarjeta.querySelector(".mensaje");
    if (nombre === "" || descripcion === "" || precio === "") {
        mensaje.textContent = "Completa todos los campos.";
        mensaje.style.color = "#b23b3b";
        return;
    }
    const datos = {
        nombre: nombre,
        descripcion: descripcion,
        precio: Number(precio)
    };
    localStorage.setItem(`artesania_${id}`, JSON.stringify(datos));
    mensaje.textContent = "Producto guardado correctamente.";
    mensaje.style.color = "#388e3c";
    setTimeout(function() {
        mensaje.textContent = "";
    }, 2500);
}
/*-------------------------*/
/*--|restaurar_los_datos|--*/
/*-------------------------*/
function restaurarDatos(tarjeta) {
    const id = tarjeta.dataset.id;
    const datos = datosIniciales[id];
    localStorage.setItem(`artesania_${id}`, JSON.stringify(datos));
    mostrarDatos(tarjeta);
    const mensaje = tarjeta.querySelector(".mensaje");
    mensaje.textContent = "Producto restaurado.";
    mensaje.style.color = "#795548";
    setTimeout(function() {
        mensaje.textContent = "";
    }, 2500);
}
/*-----------------------------------------------*/
/*--|restablecer_los_todos_usando_localstorage|--*/
/*-----------------------------------------------*/
function restablecerTodos() {
    const confirmacion = confirm("¿Deseas restablecer todos los productos?");
    if (!confirmacion) {
        return;
    }
    tarjetas.forEach(function(tarjeta) {
        const id = tarjeta.dataset.id;
        localStorage.setItem(`artesania_${id}`, JSON.stringify(datosIniciales[id]));
        mostrarDatos(tarjeta);
    });
    mensajeGeneral.textContent = "Todos los productos fueron restaurados.";
    mensajeGeneral.style.color = "#388e3c";
    setTimeout(function() {
        mensajeGeneral.textContent = "";
    }, 2500);
}
/*-----------------------------*/
/*--|eventos_de_las_tarjetas|--*/
/*-----------------------------*/
tarjetas.forEach(function(tarjeta) {
    const botonGuardar = tarjeta.querySelector(".guardar");
    const botonRestaurar = tarjeta.querySelector(".restaurar");
    botonGuardar.addEventListener("click", function() {
        guardarDatos(tarjeta);
    });
    botonRestaurar.addEventListener("click", function() {
        restaurarDatos(tarjeta);
    });
});
/*--------------------*/
/*--|evento_general|--*/
/*--------------------*/
botonRestablecer.addEventListener("click", function() {
    restablecerTodos();
});
/*----------------------*/
/*--|cargar_los_datos|--*/
/*----------------------*/
tarjetas.forEach(function(tarjeta) {
    mostrarDatos(tarjeta);
});
/*-----------------------*/
/*--|formato_de_precio|--*/
/*-----------------------*/
tarjetas.forEach(function(tarjeta) {
    const precio = tarjeta.querySelector(".precio_producto");
    precio.addEventListener("change", function() {
        if (Number(precio.value) < 0) {
            precio.value = 0;
        }
    });
});