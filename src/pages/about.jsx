/* eslint-disable react/prop-types */
import { Link } from "../Link.jsx";

const i18n = {
  es: {
    title: "Sobre Nosotros",
    buttoon: "Ir a la home",
    description:
      "¡Hola! Me llamo Sebastian y estoy creando un clon de React Router",
  },
  en: {
    title: "About us",
    buttoon: "Go to home page",
    description:
      "¡Hello! My name is Sebastian and I am creating a clon of React Router.",
  },
};

const useI18n = (lang) => {
  return i18n[lang] || i18n.en;
};

export default function Aboutpage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? "es");
  return (
    <>
      <h1>{i18n.title}</h1>
      <img
        src="https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Foto Sebas"
      />
      <p>{i18n.description}</p>
      <Link to="/">{i18n.buttoon}</Link>
      {/* <a href="/about">Ir a la Home</a> */}
    </>
  );
}
