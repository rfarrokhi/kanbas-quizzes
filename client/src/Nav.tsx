import { Link, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className = "nav nav-pills mb-2">
      <Link className = "nav-link" to = "/Labs/a3">A3</Link>
      <Link className = "nav-link" to = "/Labs/a4">A4</Link>
      <Link className = "nav-link" to = "/hello">Hello</Link>
      <Link className = "nav-link" to = "/Kanbas">Kanbas</Link>
    </nav>
  );
}

export default Nav;