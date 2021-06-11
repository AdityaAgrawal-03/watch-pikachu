import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import { data, defaultVideoType } from "../../data/data";
import { useData } from "../../context/DataContext/DataContext";
import "./VideoDetails.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Video } from "../../data/data.types";

export function VideoDetails() {
  const { videoId } = useParams();
  const { videos } = data;
  const {
    state: { liked, watchLater, history },
    dispatch,
  } = useData();

  const [modal, setModal] = useState(false);

  const video = videos.find((currentVideo) => currentVideo.id === videoId);
  const videoItem = video ?? defaultVideoType;

  const isInLiked = liked.find(
    (likedVideoItem) => likedVideoItem.id === videoId
  );

  const isInWatchLater = watchLater.find(
    (watchLaterVideoItem) => watchLaterVideoItem.id === videoId
  );

  const isInHistory = history.find(
    (historyVideoItem) => historyVideoItem.id === videoId
  );

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
            onPlay={() =>
              !isInHistory
                ? dispatch({ type: "ADD_TO_HISTORY", payload: videoItem })
                : null
            }
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
                onClick={() =>
                  dispatch({ type: "TOGGLE_LIKED", payload: videoItem })
                }
              >
                <span className="material-icons">thumb_up</span>
              </button>
            ) : (
              <button
                className="btn-primary-icon"
                onClick={() =>
                  dispatch({ type: "TOGGLE_LIKED", payload: videoItem })
                }
              >
                <span className="material-icons-outlined">thumb_up</span>
              </button>
            )}

            {isInWatchLater ? (
              <button
                className="btn-primary-icon"
                onClick={() =>
                  dispatch({ type: "TOGGLE_WATCH_LATER", payload: videoItem })
                }
              >
                <span className="material-icons">watch_later</span>
              </button>
            ) : (
              <button
                className="btn-primary-icon"
                onClick={() =>
                  dispatch({ type: "TOGGLE_WATCH_LATER", payload: videoItem })
                }
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

type ShowModalProps = {
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
  let idCounter = 2;


  const isInPlaylist = (playlistId : number) => {
    const playlistItem = playlist.find((playlistItem) => playlistItem.playlistId === playlistId)
    return playlistItem?.video.find((video) => video.id === videoId) ? true : false;
  } 

  const createPlaylist = () => {
    dispatch({
      type: "CREATE_PLAYLIST",
      payload: { id: idCounter++, name: playlists, video: videoItem },
    });
    setPlaylists("");
  };

  const addVideoToPlaylist = (playlistId: number) => {
    dispatch({
      type: "ADD_TO_PLAYLIST",
      payload: { playlistId: playlistId, video: videoItem },
    });
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
                {playlist.map(({ playlistId, name, video }) => (
                  <li key={playlistId}>
                    <input
                      type="checkbox"
                      onChange={() => addVideoToPlaylist(playlistId)}
                      checked={isInPlaylist(playlistId)}
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
              <button
                className="btn-primary-icon"
                onClick={createPlaylist}
              >
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
