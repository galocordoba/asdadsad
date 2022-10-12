let carrito = [];
let [precio, img, id, cantidad, nombre] = carrito;
let stock = [];

document.addEventListener("DOMContentLoaded", async () => {
  stock = await stockJson();

  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }
  mostrarProductos(stock);
});

const mostrarProductos = (stock) => {
  const shop = document.getElementById("shop");

  stock.forEach((p) => {
    let producto = document.createElement("div");

    producto.innerHTML = `
        <div>
            <img class="imagen" src="${p.img}" alt="producto">
            <div class="informacion"
                  <p class="nombre_producto">${p.nombre}</p>
                  <p class="precio">$${p.precio}</p>
                  <button>Comprar</button>
            </div>
        </div>    `;

    shop.appendChild(producto);

    producto.querySelector("button").addEventListener("click", () => {
      agregarProductos(p.id);
    });
  });
};

mostrarProductos();

function agregarProductos(id) {
  let producto = stock.find((p) => p.id === id);

  let productoEnCarrito = carrito.find((p) => p.id === id);

  productoEnCarrito && productoEnCarrito.cantidad++;

  if (!productoEnCarrito) {
    producto.cantidad = 1;
    carrito.push(producto);
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

  carrito.forEach((p) => {
    const { id, nombre, img, precio, cantidad } = p;
    let producto = document.createElement("div");
    producto.classList.add("col-12");
    producto.classList.add("col-md-4");
    producto.classList.add("mb-5");
    producto.classList.add("d-flex");
    producto.classList.add("justify-content-center");
    producto.classList.add("contenedor");

    producto.innerHTML = `
        
        <div class="card text-dark" style="width: 18rem;">
            <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-light">${nombre}</h5>
                <p class="text-light">$${precio}</p>
                <p class="text-light">Cantidad: ${cantidad}</p>
                <button class="btn btn-danger boton text-light">Eliminar</button>
            </div>
        </div>`;

    producto.querySelector("button").addEventListener("click", () => {
      eliminarProducto(p);
    });

    carritoHTML.appendChild(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
}

function eliminarProducto(producto) {
  if (producto.cantidad === 1) {
    carrito = carrito.filter((prod) => prod.id !== producto.id);
  }

  producto.cantidad > 1 && producto.cantidad--;

  localStorage.setItem("carrito", JSON.stringify(carrito));

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
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciar = document.getElementById("vaciar-carrito");

vaciar.addEventListener("click", () => {
  carrito.length = 0;
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarCarrito();
  totalFinal();
});
