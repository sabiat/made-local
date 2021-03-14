import   { Link } from "react-router-dom";

export default function Nav() {
  return (
  <nav>
  <ul>
    <li>
      <Link to="/home">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/users">Users</Link>
    </li>
  </ul>
</nav>
  );
}