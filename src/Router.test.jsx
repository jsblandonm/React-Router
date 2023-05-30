import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Router } from "./Router";
import { getCurrentPath } from "./utils.js";
import { Route } from "./Route";
import { Link } from "./Link";

vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));
describe("Router", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  it("should work", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("Should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);
    expect(screen.getByText("404")).toBeTruthy();
  });

  it("should render the component of the frist route that match", () => {
    getCurrentPath.mockReturnValue("/about");
    const routes = [
      {
        path: "/",
        Component: () => <h1>home</h1>,
      },
      {
        path: "/about",
        Component: () => <h1>about</h1>,
      },
    ];

    render(<Router routes={routes} />);
    expect(screen.getByText("about")).toBeTruthy();
  });

  it("should navigate using links", () => {
    getCurrentPath.mockReturnValue("/");

    render(
      <Router>
        <Route
          path="/"
          Component={() => (
            <>
              <h1>home</h1>
              <Link to="/about">about</Link>
            </>
          )}
        />
        <Route path="/about" Component={() => <h1>about</h1>} />
      </Router>
    );

    //click on the link
    screen.getByText("about").click();

    //check that new route is rendered
    expect(screen.getByText("about")).toBeTruthy();
  });
});
