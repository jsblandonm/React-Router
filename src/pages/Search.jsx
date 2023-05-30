/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";

export default function searchPage({ routeParams }) {
  useEffect(() => {
    document.title = `has buscado ${routeParams.query}`;
  }, []);
  return <h1>has buscado {routeParams.query}</h1>;
}
