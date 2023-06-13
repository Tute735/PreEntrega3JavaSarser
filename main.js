const productosArray = [
    {id: "1", nombre:"Zapatillas Nike Dunk Hi Retro", imagen:"../img/producto1.jpg", precio:58.799, categoria:{marca:"Nike", id:"nike"}},
    {id: "2", nombre:"Zapatillas Nike Air Force 1 High 07", imagen:'../img/producto2.jpg', precio:64.799, categoria:{marca:"Nike", id:"nike"}},
    {id: "3", nombre:"Zapatillas adidas Forum Mid",cantidad:1, imagen:"../img/producto3.jpg", precio:37.999, categoria:{marca:"Adidas", id:"adidas"}},
    {id: "4", nombre:"Zapatillas Jordan 1 Low SE Mujer", imagen:"../img/producto4.jpg", precio:57.999, categoria:{marca:"Nike", id:"nike"}},
    {id: "5", nombre:"Zapatillas Nike Air Vapormax 2021 Fk", imagen:"../img/producto5.jpg", precio:96.999, categoria:{marca:"Nike", id:"nike"}},
    {id: "6", nombre:"Zapatillas adidas Forum Mid Thebe ", imagen:"../img/producto6.jpg", precio:57.999, categoria:{marca:"Adidas", id:"adidas"}},
    {id: "7", nombre:"Zapatillas adidas Superstar Ot Tech", imagen:"../img/producto7.jpg", precio:57.999, categoria:{marca:"Adidas", id:"nike"}},
    {id: "8", nombre:"Zapatillas Adidas Forum Mid", imagen:"../img/producto8.jpg", precio:55.999, categoria:{marca:"Adidas", id:"nike"}},
    {id: "9", nombre:"Zapatillas Nike LeBron 19", imagen:"../img/producto9.jpg", precio:79.999, categoria:{marca:"Nike", id:"nike"}},
    
]
let carrito =[]
const cardsProductos = document.getElementById('cardsProductos')
const vaciarCarrito = document.getElementById ('vaciarCarrito')
const precioTotal = document.getElementById ('precioTotal')

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();})


vaciarCarrito.addEventListener('click', ()=>{
    carrito.length =[]
    mostrarCarrito()
})
precioTotal.innerText = carrito.reduce((acc,productos)=> acc + productos.cantidad * productos.precio, 0)
productosArray.forEach((sneaker) =>{
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML =`
    <img src="${sneaker.imagen}" class="imgCard" alt="...">
    <div class="card-body">
    <h5 class="card-title">${sneaker.nombre}</h5>
    <p class="card-text">$${sneaker.precio}</p>
    <button id="agregarProducto(${sneaker.id})" class="btn btn-primary buttonCard">Agregar</button>
    </div>
    </div>`

    cardsProductos.appendChild(div)
   
    const boton = document.getElementById(`agregarProducto(${sneaker.id})`)

     boton.addEventListener('click', () =>{
        agregarProducto(sneaker.id)
     })

    
    })
    
   
    const agregarProducto = (id) => {
      const item = productosArray.find((prod) => prod.id === id)
      const existe = carrito.find(prod => prod.id === id)
      
        if(existe){
              existe.cantidad++
              mostrarCarrito()
            }
          
         else {
         const ItemAgregar ={
          id:item.id,
          nombre:item.nombre,
          precio:item.precio,
          cantidad: 1,
          imagen: item.imagen
          
         }
          carrito.push(ItemAgregar)
        }
        mostrarCarrito()
    }
      ;  

const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, imagen, cantidad } = prod;
        modalBody.innerHTML += `
        <div class="modalContainer">
          <div>
          <img class="img-fluid img-carrito" src="${imagen}"/>
          </div>
          <div class="infoContainer">
          <p>Producto: ${nombre}</p>
          <p>Precio: $${precio}</p>
          <p>Cantidad: ${cantidad}</p>
            <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
        </div>`;
      });
    }
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    guardarStorage()
    
}

const eliminarProducto = (id) =>{
    const item = carrito.find((prod) => id !==prod.id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
   mostrarCarrito()
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }