/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, Children } from "react";
import { EVENTS } from "./const.js";
import { match, regexpToFunction } from "path-to-regexp";
import { getCurrentPath } from "./utils.js";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  const [routeParams, setrouteParams] = useState({});

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  // let routeParams = {};

  //ad routes form children <Route/> components

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type;
    const isRoute = name === "Route";
    return isRoute ? props : null;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    // se utilizo path-regexp
    // para poder detectar rutas dinamicas como por ejemplo
    // /search/:query  <--- :query es una ruta dinamica

    const matchUrl = match(path, { decode: decodeURIComponent });
    const matched = matchUrl(currentPath);
    if (!matched) return false;

    // guardar los parmametros de la Url que eran dinamicos
    // y que hemos extraido con path-to-regexp
    // por ejemplo, si la ruta es /search/:query
    // y la URL es /search/javascript
    // matched.params.query === 'javascript'

    setrouteParams(matched.params);

    // routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
