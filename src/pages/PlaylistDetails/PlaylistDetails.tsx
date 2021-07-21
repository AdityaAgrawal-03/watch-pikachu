import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import { useData } from "../../context/DataContext/DataContext";
import "./PlaylistDetails.css";

const defaultPlaylistType = {
  playlistId: 999,
  name: "aloo",
  videos: [
    {
      _id: "1234",
      url: "bad url",
      thumbnail: "bad thumbnail",
      title: "some title",
      statistics: "kuch toh hai",
      description: "bekar video",
      channelName: "does not exist",
      channelLogo: "kuch nahi hai bhai",
    },
  ],
};

export function PlaylistDetails() {
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const {
    state: { playlist },
    dispatch,
  } = useData();

  const [editButton, setEditButton] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const getPlaylist = playlist.find(
    (playlistItem) => playlistItem._id === playlistId
  );

  const playlistItem = getPlaylist ?? defaultPlaylistType;

  const updatePlaylistName = async () => {
    setEditButton(!editButton);
    try {
      const {
        data: { success, updatedPlaylist },
      } = await axios.post(
        `https://watch-pikachu-backend.aditya365.repl.co/playlists/${playlistId}`,
        {
          playlistUpdatedName: playlistName,
        }
      );

      console.log({ success, updatedPlaylist });

      if (success) {
        dispatch({
          type: "UPDATE_PLAYLIST_NAME",
          payload: {
            playlistId: playlistId,
            name: updatedPlaylist.name
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlaylist = async () => {
    try {
      const { data: { success } } = await axios.delete( `https://watch-pikachu-backend.aditya365.repl.co/playlists/${playlistId}`);
      if (success) {
        dispatch({
          type: "DELETE_PLAYLIST",
          payload: { playlistId: playlistId },
        });
        navigate("/playlists");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="playlist-detail-page">
      <div className="playlist-detail-heading">
        {!editButton ? (
          <h1> {playlistItem.name} </h1>
        ) : (
          <input
            type="text"
            placeholder={playlistItem.name}
            className="input-text input-text-lg"
            onChange={(e) => {
              e.preventDefault();
              setPlaylistName(() => e.target.value);
            }}
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
              onClick={() => updatePlaylistName()}
            >
              <span className="material-icons-round md-36">check_circle</span>
            </button>
          )}

          <button
            className="btn-primary-icon"
            onClick={() => deletePlaylist()}
          >
            <span className="material-icons-round md-36">delete</span>
          </button>
        </div>
      </div>
      <div className="playlist-detail-video-container">
        {playlistItem.videos.map((videoItem) => (
          <VideoCard key={videoItem._id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
