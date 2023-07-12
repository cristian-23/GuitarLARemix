import imagen from "../../public/img/nosotros.jpg";
import styles from "../styles/nosotros.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

export function meta() {
  return [
    {
      title: "GuitarLA - Nosotros",
    },
    {
      name: "description",
      content: "Venta de guitarras, blog de música",
    },
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen nosotros" />
        <div>
          <p>
            Proin scelerisque hendrerit risus, eu consectetur nibh facilisis ac.
            Maecenas lobortis vestibulum aliquet. Quisque lobortis mollis
            sollicitudin. Etiam in luctus nunc. Praesent molestie augue sit amet
            mi rutrum, sed ultricies purus pharetra. Vivamus in varius ante.
            Duis pulvinar nisi sit amet est consectetur, vel ullamcorper quam
            blandit.
          </p>
          <p>
            Duis tempus enim eget congue lobortis. Etiam id maximus purus.
            Aliquam faucibus at nunc eget suscipit. Sed porta, arcu ac dictum
            feugiat, mauris mi viverra massa, at fringilla ex lorem et tortor.
            Sed nec justo sollicitudin ipsum finibus ornare quis sed dolor.
            Nullam non lectus at lacus imperdiet laoreet. Donec accumsan
            ultricies libero, non tempus turpis rutrum et.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;
