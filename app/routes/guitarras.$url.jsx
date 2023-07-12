import { useState } from "react";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarras.server";
import styles from "~/styles/guitarras.css"

export async function loader({ params }){
  const { url } = params
  const guitarra = await getGuitarra(url)
  if (guitarra.data.length === 0) {
    throw new Response("",{status:404, statusText: "Guitarra No Encontrada"})
  }
  return guitarra
}

export function meta({ data }) {
  if (!data) {
    return [
      {
        title:"GuitarLA - Guitarra No Encontrada",
        description: `Guitarra, venta de guitarras, guitarra, guitarra no encontrada`
      }
    ]
  }
  return [
    {
    title: `GuitarLA - ${data.data[0].attributes.nombre}`,
  },
  {
    description: `Guitarra, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
  }
]
}

export function links() {
  return [
    {
      rel:"stylesheet",
      href: styles
    }
  ]
}

function guitarras$url() {
  const { agregarCarrito } = useOutletContext()
  const guitarra = useLoaderData()
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes
  const [cantidad, setCantidad]= useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cantidad < 1) {
      alert("Debes seleccionar una cantidad")
      return
    }
    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen:imagen.data.attributes.url,
      nombre,
      precio,
      cantidad
    }
    agregarCarrito(guitarraSeleccionada)
  }

  return (
    <>
    <div className="guitarra">
      <img className="imagen" src={imagen.data.attributes.url} alt={`imagen de la guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>

        <form onSubmit={handleSubmit} className="formulario">
          <label htmlFor="cantidad">Cantidad</label>

          <select id="cantidad" onChange={ e => setCantidad(parseInt(e.target.value))}>
            <option value="0">---Seleccione---</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input type="submit" value="Agregar al carrito" />
        </form>
      </div>
    </div>
    </>
  )
}

export default guitarras$url