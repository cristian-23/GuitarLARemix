import { useState, useEffect } from "react";
import { 
  Meta, 
  Links, 
  Outlet, 
  Scripts, 
  LiveReload, 
  isRouteErrorResponse,
  useRouteError, Link } from "@remix-run/react";
import styles from "./styles/index.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { ToastContainer, toast } from 'react-toastify';
import stylesToast from 'react-toastify/dist/ReactToastify.css';

export function meta() {
  return [
    {
      charset:"utf-8"
    },
    {
      title: "GuitarLA - Remix",
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
  ];
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "true"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap"
    },
    {
      rel: "stylesheet",
      href: styles
    },
    {
      rel: "stylesheet",
      href: stylesToast
    }
  ];
}

export default function App() {
  const carritoLS = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("carrito"))?? [] : null
  const [carrito, setCarrito] = useState(carritoLS)

  useEffect(()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
  },[carrito])
  const agregarCarrito = (guitarra) =>{
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      //Iterando sobre el arreglo, e identificar el elemento duplicado
      const carritoActualizado = carrito.map( guitarraState => {
        if (guitarraState.id === guitarra.id) {
          //Reescribir la cantidad
          guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
      })
      //Añadir al carrito
      setCarrito(carritoActualizado)
    }else{
      //Registro nuevo, agregar al carrito
      setCarrito([...carrito, guitarra])
      toast.success("Agregado al carrito !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  const actualizarCantidad = ( guitarra )=>{
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }
  const eliminarGuitarra = (id)=>{
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    setCarrito(carritoActualizado)
  }
  return (
    <Document carrito={carrito}>
      <ToastContainer/>
      <Outlet context={{ agregarCarrito, carrito, actualizarCantidad, eliminarGuitarra }}/>
    </Document>
  );
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer/>
        <Scripts/>
        <LiveReload/>
      </body>
    </html>
  );
}

/**  Manejo de errores **/

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className="error">
          {error.status} {error.statusText}
        </p>
        <p className="error">{error.data}</p>
        <Link className="error-enlace" to={"/"}>Talvez quieres volver ala paguina principal</Link> 
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document>
        <h1>Error</h1>
        <p className="error">{error.message}</p>
        <p className="error">The stack trace is:</p>
        <pre>{error.stack}</pre>
        <Link className="error-enlace" to={"/"}>Tal vez quieras volver a la pagina principal</Link>
      </Document>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}