import { useParams } from "react-router";
import ReactPlayer from "react-player/youtube";
import { data, defaultVideoType } from "../../data/data";
import { useData } from "../../context/DataContext/DataContext";
import "./VideoDetails.css";

export function VideoDetails() {
  const { videoId } = useParams();
  const { videos } = data;
  const {
    state: { liked, watchLater, history },
    dispatch,
  } = useData();

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
