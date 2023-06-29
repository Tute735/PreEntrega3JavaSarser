const modalCarrito = document.querySelector("#modalCarrito")
const abrirCarrito = document.querySelector("#abrirCarrito")
const cerrarCarrito = document.querySelector("#cerrarCarrito")
const cardsProductos = document.querySelector("#cardsProductos")
const vaciarCarrito = document.querySelector("#vaciarCarrito")
const finalizarCompra = document.querySelector  (".Comprar")
const agregarCarritos = document.querySelectorAll(".agregarCarrito")

let carrito = []
let precioTotal = 0

abrirCarrito.addEventListener("click", () => {
  modalCarrito.showModal()
})

cerrarCarrito.addEventListener("click", () => {
  modalCarrito.close()
})
vaciarCarrito.addEventListener('click', ()=>{
  carrito.length =[]
  verCarrito()})

const crearProductos = () => {
  cardsProductos.innerHTML = ""



const verProductos = async() =>{
const respuesta = await fetch ("./data.json")
const sneakers = await respuesta.json()

  sneakers.forEach((producto => {
    cardsProductos.innerHTML += `
      <div class="producto" Idproducto="${producto.id}">
        <img src="${producto.imagen}" alt="imagen del producto" class="imgProducto">
        <div class="nombreProducto">${producto.nombre}</div>
        <div class="precioProducto">$${producto.precio}</div>
        <div class="botonProducto">
          <button class="agregarCarrito">
            <span class="material-symbols-outlined">add</span>
          </button>
        </div>
      </div>
    `
  
  }))
  
}
verProductos()









  fetch("./data.json")
  .then((productosArray)=> productosArray.json())
  .then((productos)=>{
    agregarCarritos.forEach(boton => {
      boton.addEventListener("click", () => {
        const producto = productos.find(producto => producto.id == boton.parentNode.parentNode.attributes.Idproducto.value)
        const sumarProd = carrito.find(prod => prod.id == producto.id) 
  
        if (sumarProd) {
          sumarProd.cantidad++
        } else {
          carrito.push({...producto, cantidad: 1})
        }
      console.log(carrito)
      })
    })
  })
}


crearProductos()

const verCarrito = () => {
  const carritoContainer = document.querySelector("#modalContainer")
  carritoContainer.innerHTML = ""

  let carritoHTML = ""

  carrito.forEach(prod => {
    carritoHTML += `
      <div class="articulo" prodId="${prod.id}">
        <img class="carritoImg" src="${prod.imagen}">
        <p class="nombreCarrito">${prod.nombre}</p>
        <p class="precioCarrito">$${prod.precio}</p>
        <p class="cantCarrito">${prod.cantidad}</p>
        <div>
          <button class="agregarUd">Agregar Ud</button>
        </div>
        <div>
          <button class="eliminarUd">Eliminar Ud</button>
        </div>
        <div>
          <button class="eliminarProd">Eliminar</button>
        </div>
      </div>
    `
  })

  const cantidades = carrito.reduce((a, b) => a + b.cantidad, 0)
  precioTotal = carrito.reduce((a, b) => a + b.precio * b.cantidad, 0)

  carritoHTML += `
    <div class= "precioCant">
    <div class = "cantidadTot">
      <p class="canTCarrito">Cantidad Total:</p>
      <p class="canTCarrito">${cantidades}</p>
    </div>  
    <div class ="PrecioTot">
      <p class="preciototal">Precio Total: $</p>
      <p class="preciototal">${precioTotal}</p>
    </div>
    </div>
  `

  carritoContainer.innerHTML = carritoHTML

 
  const eliminarProd = document.querySelectorAll(".eliminarProd")

  eliminarProd.forEach(botones => {
    botones.addEventListener("click", () => {
      const prodId = botones.parentNode.parentNode.attributes.prodId.value
      const prodIndex = carrito.findIndex(prod => prod.id == prodId)

      carrito.splice(prodIndex, 1)
      verCarrito()
    })
  })

  const agregarUd = document.querySelectorAll(".agregarUd")

  agregarUd.forEach(botones => {
    botones.addEventListener("click", () => {
      const prodId = botones.parentNode.parentNode.attributes.prodId.value
      const prod = carrito.find(prod => prod.id == prodId)
      prod.cantidad++

      verCarrito()
    })
  })

  const eliminarUd = document.querySelectorAll(".eliminarUd")

  eliminarUd.forEach(botones => {
    botones.addEventListener("click", () => {
      const prodId = botones.parentNode.parentNode.attributes.prodId.value
      const prod = carrito.find(prod => prod.id == prodId)
      const prodIndex = carrito.findIndex(prod => prod.id == prodId)

      prod.cantidad--

      if (prod.cantidad < 1) {
        carrito.splice(prodIndex, 1)
      }

      verCarrito()
    })
  })
}

finalizarCompra.addEventListener("click", () => {
  const userInfo = localStorage.getItem("userInfo")

  if (userInfo == null) {
    window.open("http://192.168.1.39:5500/html/register.html", "_self")
  } else {
    localStorage.setItem("carrito", JSON.stringify({ articulos: [...carrito], total: precioTotal }))
    carrito = []
    verCarrito()
    const mensajeCompraRealizada = document.createElement("p")
    mensajeCompraRealizada.textContent = "¡Compra realizada!"
    mensajeCompraRealizada.classList.add("mensajeCompra")
    const carritoContainer = document.querySelector("#modalContainer")
    carritoContainer.appendChild(mensajeCompraRealizada)
  }

})
