import { Link } from "../Link.jsx";

export default function Homepage() {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un React Touter desde cero</p>
      <Link to="/about">Ir a sobre Nosotros</Link>
      {/* <a href="/about">Ir a Sobre nosotros</a> */}
    </>
  );
}
