import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCardProps } from "../VideoCard/videocard.types";
import "./HistoryVideoCard.css";

export function HistoryVideoCard({ videoItem }: VideoCardProps) {
  const { id, thumbnail, title, description } = videoItem;

  const { dispatch } = useData();

  return (
    <>
      <Link to={`/video/${id}`} className="link">
        <div className="video-card history-video-card">
          <div className="video-thumbnail">
            <img
              src={thumbnail}
              alt="thumbnail"
              className="video-thumbnail-image"
            />
          </div>
          <div className="video-content">
            <div className="video-title">
              <strong>{title}</strong>
            </div>
            <div className="video-description">{description}</div>
          </div>
          <button
            className="btn btn-primary-icon btn-history"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "REMOVE_FROM_HISTORY", payload: videoItem });
            }}
          >
            <span className="material-icons-round">cancel</span>
          </button>
        </div>
      </Link>
    </>
  );
}
