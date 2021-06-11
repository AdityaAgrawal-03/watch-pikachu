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
        {playlist.map(({ playlistId, name, video }) => (
          <div key={playlistId} className="playlist-container">
            <h2> {name} </h2>
            <div className="playlist-video-container">
            {video.map(({ id, thumbnail, title }) => (
              <Link to={`/videoDetails/${id}`} className="link">
              <div key={id} className="playlist-video-card">
                <div>
                  <img src={thumbnail} alt="thumbnail"  className="playlist-thumbnail" /> 
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
