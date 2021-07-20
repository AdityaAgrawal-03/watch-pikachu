import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import "./Playlist.css";

export function Playlists() {
  const {
    state: { playlist },
  } = useData();

  console.log({ playlist });

  return (
    <div className="playlist-page">
      <h1> Playlists </h1>
      <div className="playlists-wrapper">
        {playlist.map(({ _id, name, videos }) => (
          <div key={_id} className="playlist-container">
            <div className="playlist-container-heading">
              <h2> {name} </h2>
              <Link to={`/playlist/${_id}`} className="link">
                <button className="btn btn-primary-icon">
                  <span className="material-icons-round">open_in_new</span>
                </button>
              </Link>
            </div>

            <div className="playlist-video-container">
              {videos.map(({ _id, thumbnail, title }) => (
                <Link to={`/video/${_id}`} className="link">
                  <div key={_id} className="playlist-video-card">
                    <div>
                      <img
                        src={thumbnail}
                        alt="thumbnail"
                        className="playlist-thumbnail"
                      />
                    </div>
                    <div className="playlist-video-title">
                      <strong>{title}</strong>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
