import { useParams } from "react-router";
import { useData } from "../../context/DataContext/DataContext";
import "./PlaylistDetails.css";

export function PlaylistDetails() {
  const { playlistId } = useParams();
  const {
    state: { playlist },
  } = useData();

  const getPlaylist = playlist.find(
    (playlistItem) => playlistItem.playlistId === playlistId
  );

  return (
    <div className="playlist-detail-page">
      <div className="playlist-detail-heading">
        <h1> {getPlaylist?.name} </h1>
        <div className="playlist-detail-heading-buttons">
          <button className="btn-primary-icon btn-playlist-detail">
            <span className="material-icons-round md-36">edit</span>
          </button>
          <button className="btn-primary-icon btn-playlist-detail">
            <span className="material-icons-round md-36">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
