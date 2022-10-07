let carrito = [];
let [precio, img, id, cantidad, nombre] = carrito;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    mostrarCarrito();
  }
});

function mostrarProductos() {
  const shop = document.getElementById("shop");

  stock.forEach((p) => {
    let producto = document.createElement("div");

    producto.innerHTML = `
        <div>
            <img class="imagen" src="${p.img}" alt="producto">
            <div class="informacion"
                  <p class="nombre_producto">${p.nombre}</p>
                  <p class="precio">${p.precio}</p>
                  <button>Comprar</button>
            </div>
        </div>    `;

    shop.appendChild(producto);

    producto.querySelector("button").addEventListener("click", () => {
      agregarProductos(p.id);
    });
  });
}

mostrarProductos();

function agregarProductos(id) {
  let producto = stock.find((p) => p.id === id);

  let productoEnCarrito = carrito.find((p) => p.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;

    console.log(carrito);
  } else {
    producto.cantidad = 1;

    carrito.push(producto);

    console.log(carrito);
  }
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Producto añadido al carrito!",
    showConfirmButton: false,
    timer: 700,
  });

  mostrarCarrito();
  totalFinal();
}

function mostrarCarrito() {
  let carritoHTML = document.querySelector("#carrito");

  carritoHTML.innerHTML = "";

  carrito.forEach((p, id) => {
    let producto = document.createElement("div");
    producto.classList.add("col-12");
    producto.classList.add("col-md-4");
    producto.classList.add("mb-5");
    producto.classList.add("d-flex");
    producto.classList.add("justify-content-center");
    producto.classList.add("contenedor");

    producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${p.img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.nombre}</h5>
                <p>$${p.precio}</p>
                <p>Cantidad: ${p.cantidad}</p>
                <button class="btn btn-danger boton">Eliminar</button>
            </div>
        </div>`;

    producto.querySelector("button").addEventListener("click", () => {
      eliminarProducto(id);
    });

    carritoHTML.appendChild(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
}

function eliminarProducto() {
  carrito[id].cantidad--;

  carrito[id].cantidad === 0 && carrito.splice(id, 1);

  mostrarCarrito();
  totalFinal();
}

function totalFinal() {
  let total = 0;
  carrito.forEach((p) => {
    total += p.precio * p.cantidad;
  });

  const totall = document.getElementById("total");

  totall.innerHTML = `<h5>$ ${total}</h5> `;
}

const vaciar = document.getElementById("vaciar-carrito");

vaciar.addEventListener("click", () => {
  carrito.length = 0;
  mostrarCarrito();
  totalFinal();
});
