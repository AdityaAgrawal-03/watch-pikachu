import { useState } from "react";
import { useParams } from "react-router";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useData } from "../../context/DataContext/DataContext";
import "./PlaylistDetails.css";

export function PlaylistDetails() {
  const { playlistId } = useParams();
  const {
    state: { playlist },
    dispatch,
  } = useData();

  const [editButton, setEditButton] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const getPlaylist = playlist.find(
    (playlistItem) => playlistItem.playlistId === playlistId
  );

  return (
    <div className="playlist-detail-page">
      <div className="playlist-detail-heading">
        {!editButton ? (
          <h1> {getPlaylist?.name} </h1>
        ) : (
          <input
            type="text"
            placeholder="testing"
            className="input-text input-text-lg"
            onChange={(e) => setPlaylistName(() => e.target.value)}
          />
        )}

        <div className="playlist-detail-heading-buttons">
          {!editButton ? (
            <button
              className="btn-primary-icon"
              onClick={() => setEditButton(!editButton)}
            >
              <span className="material-icons-round md-36">edit</span>
            </button>
          ) : (
            <button
              className="btn-primary-icon"
              onClick={() => {
                setEditButton(!editButton);
                dispatch({
                  type: "UPDATE_PLAYLIST_NAME",
                  payload: { playlistId: playlistId, name: playlistName },
                });
              }}
            >
              <span className="material-icons-round md-36">check_circle</span>
            </button>
          )}

          <button className="btn-primary-icon">
            <span className="material-icons-round md-36">delete</span>
          </button>
        </div>
      </div>
      <div className="playlist-detail-video-container">
        {getPlaylist?.video.map((videoItem) => (
          <VideoCard key={videoItem.id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
