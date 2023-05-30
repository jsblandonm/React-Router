import { Suspense, lazy } from "react";
import "./App.css";
import { Router } from "./Router";
import Page404 from "./pages/404";
import searchPage from "./pages/Search";
import { Route } from "./Route";

const LazyHomePage = lazy(() => import("./pages/home"));
const LazyAboutPage = lazy(() => import("./pages/about"));

const appRoutes = [
  {
    path: "/:lang/about",
    Component: LazyAboutPage,
  },
  {
    path: "/search/:query",
    Component: searchPage,
  },
];

function App() {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path="/" Component={LazyHomePage} />
          <Route path="/about" Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
