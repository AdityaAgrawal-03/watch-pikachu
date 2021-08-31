import { Dispatch, SetStateAction, useState } from "react";
import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import { defaultVideoType } from "../../data/data";
import { useData } from "../../context/DataContext/DataContext";
import "./VideoDetails.css";
import { Video } from "../../data/data.types";
import { Playlist } from "../../reducer/reducer.types";
import axios from "axios";
import { API_URL } from "../../utils/index"

export function VideoDetails() {
  const { videoId } = useParams();

  const {
    state: { videos, liked, history, playlist },
    dispatch,
  } = useData();

  const [modal, setModal] = useState(false);

  const video = videos.find((currentVideo) => currentVideo._id === videoId);
  const videoItem = video ?? defaultVideoType;

  const isInLiked = liked.find(
    (likedVideoItem) => likedVideoItem._id === videoId
  );

  const isInHistory = history.find(
    (historyVideoItem) => historyVideoItem._id === videoId
  );

  const watchLaterPlaylist = playlist.find(
    (playlist) => playlist.name === "Watch Later"
  ) as Playlist;

  const isInWatchLater = watchLaterPlaylist?.videos.find(
    (video) => video._id === videoId
  );

  const updatePlaylist = async (playlistId: string) => {
    try {
      const {
        data: { success, playlist },
      } = await axios.post(
        `${API_URL}/playlists/${playlistId}/${videoId}`
      );

      if (success) {
        dispatch({
          type: "UPDATE_PLAYLIST",
          payload: { _id: playlist._id, video: videoItem },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likedVideosHandler = async () => {
    try {
      const {
        data: { success, likedVideos },
      } = await axios.post(
        `${API_URL}/liked`,
        {
          video: {
            _id: videoId,
          },
        }
      );
      console.log({ success, likedVideos });
      if (success) {
        dispatch({ type: "TOGGLE_LIKED", payload: videoItem });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const historyVideosHandler = async () => {
    try {
      const {
        data: { success, historyVideos },
      } = await axios.post(
        `${API_URL}/history`,
        {
          video: {
            _id: videoId,
          },
        }
      );
      console.log({ success, historyVideos });
      if (success) {
        dispatch({ type: "ADD_TO_HISTORY", payload: videoItem });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="video-page">
      {modal && <ShowModal setModal={setModal} videoItem={videoItem} />}
      <div className="video-container">
        <div className="player-wrapper">
          <ReactPlayer
            url={video?.url}
            className="react-player"
            width="100%"
            height="100%"
            controls
            pip={true}
            onPlay={() => (!isInHistory ? historyVideosHandler() : null)}
          />
        </div>

        <div className="video">
          <div className="video-details">
            <div className="video-title">
              <strong>{video?.title}</strong>
            </div>
            <div className="video-stats">{video?.statistics}</div>
          </div>

          <div className="video-actions">
            {isInLiked ? (
              <button
                className="btn-primary-icon"
                onClick={() => likedVideosHandler()}
              >
                <span className="material-icons">thumb_up</span>
              </button>
            ) : (
              <button
                className="btn-primary-icon"
                onClick={() => likedVideosHandler()}
              >
                <span className="material-icons-outlined">thumb_up</span>
              </button>
            )}

            {isInWatchLater ? (
              <button
                className="btn-primary-icon"
                onClick={() => updatePlaylist(watchLaterPlaylist._id)}
              >
                <span className="material-icons">watch_later</span>
              </button>
            ) : (
              <button
                className="btn-primary-icon"
                onClick={() => updatePlaylist(watchLaterPlaylist._id)}
              >
                <span className="material-icons-outlined">watch_later</span>
              </button>
            )}

            <button className="btn-primary-icon" onClick={() => setModal(true)}>
              <span className="material-icons-round">playlist_add</span>
            </button>
          </div>
        </div>

        <hr />

        <div className="channel-details">
          <img src={video?.channelLogo} alt="channel-logo"></img>
          <h3>{video?.channelName}</h3>
        </div>
      </div>
    </div>
  );
}

export type ShowModalProps = {
  setModal: Dispatch<SetStateAction<boolean>>;
  videoItem: Video;
};

export function ShowModal({ setModal, videoItem }: ShowModalProps) {
  const [playlists, setPlaylists] = useState("");
  const {
    state: { playlist },
    dispatch,
  } = useData();
  const { videoId } = useParams();

  const isInPlaylist = (playlistId: string) => {
    console.log(typeof playlistId);

    const playlistItem = playlist.find(
      (playlistItem) => playlistItem._id === playlistId
    );
    console.log({ playlistItem });
    return playlistItem?.videos.find((video) => video._id === videoId)
      ? true
      : false;
  };

  const createPlaylist = async () => {
    try {
      const {
        data: { success, newPlaylist },
      } = await axios.post(
        `${API_URL}/playlists`,
        {
          name: playlists,
          video: videoId,
        }
      );
      if (success) {
        dispatch({
          type: "CREATE_PLAYLIST",
          payload: { _id: newPlaylist._id, name: playlists, video: videoItem },
        });
      }

      setPlaylists("");
    } catch (error) {
      console.error(error);
    }
  };

  const updatePlaylist = async (playlistId: string) => {
    try {
      const {
        data: { success, playlist },
      } = await axios.post(
        `${API_URL}/playlists/${playlistId}/${videoId}`
      );

      if (success) {
        dispatch({
          type: "UPDATE_PLAYLIST",
          payload: { _id: playlist._id, video: videoItem },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="dialog-content-container dialog-modal">
        <section className="dialog-content">
          <header className="dialog-header">
            <h3>Add to playlist</h3>
          </header>
          <div className="dialog-body">
            <div>
              <ul style={{ listStyleType: "none" }}>
                {playlist.map(({ _id, name, videos }) => (
                  <li key={_id}>
                    <input
                      type="checkbox"
                      onChange={() => updatePlaylist(_id)}
                      checked={isInPlaylist(_id)}
                    />

                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <input
                className="input-text input-text-sm"
                type="text"
                value={playlists}
                placeholder="add a playlist"
                onChange={(e) => setPlaylists(() => e.target.value)}
              />
              <button className="btn-primary-icon" onClick={createPlaylist}>
                <span className="material-icons-outlined">add</span>
              </button>
            </div>

            <hr />
          </div>

          <footer className="dialog-footer">
            <button
              className="btn btn-primary dialog-modal-closeBtn"
              onClick={() => setModal(false)}
            >
              Close
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}
