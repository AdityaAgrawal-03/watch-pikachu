import "./Header.css";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">
            <button className="btn btn-primary">PIKACHU</button>
          </Link>
        </div>

        <div className="nav-icons">
          <Link to="/playlists">
            <button className="btn btn-primary">Playlists</button>
          </Link>

          <Link to="/watch-later">
            <button className="btn btn-primary">
              Watch Later
            </button>
          </Link>

          <Link to="/liked">
            <button className="btn btn-primary">Liked</button>
          </Link>

          <Link to="/history">
            <button className="btn btn-primary">History</button>
          </Link>

          <button className="btn btn-primary">Logout</button>
        </div>
      </nav>
    </div>
  );
}
