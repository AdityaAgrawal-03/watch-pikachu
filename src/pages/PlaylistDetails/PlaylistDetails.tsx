import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useData } from "../../context/DataContext/DataContext";
import "./PlaylistDetails.css";
import { API_URL } from "../../utils/index";
import { PlaylistVideoCard } from "../../components/PlaylistVideoCard/PlaylistVideoCard"

const defaultPlaylistType = {
  playlistId: 999,
  name: "aloo",
  videos: [
    {
      _id: "1234",
      url: "default url",
      thumbnail: "default thumbnail",
      title: "default title",
      statistics: "1000 views",
      description: "default video description",
      channelName: "default channel name",
      channelLogo: "default channel logo",
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
      } = await axios.post(`${API_URL}/playlists/${playlistId}`, {
        playlistUpdatedName: playlistName,
      });

      if (success) {
        dispatch({
          type: "UPDATE_PLAYLIST_NAME",
          payload: {
            playlistId: playlistId,
            name: updatedPlaylist.name,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deletePlaylist = async () => {
    try {
      const {
        data: { success },
      } = await axios.delete(`${API_URL}/playlists/${playlistId}`);
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

  useEffect(() => {
    document.title = `Pikachu | ${playlistItem?.name} `
  }, [playlistItem?.name])

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

          <button className="btn-primary-icon" onClick={() => deletePlaylist()}>
            <span className="material-icons-round md-36">delete</span>
          </button>
        </div>
      </div>
      <div className="playlist-detail-video-container">
        {playlistItem.videos.map((videoItem) => (
          <PlaylistVideoCard key={videoItem._id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
