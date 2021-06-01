import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCardProps } from "../VideoCard/videocard.types";

export function HistoryVideoCard({ videoItem }: VideoCardProps) {
  const { id, thumbnail, title, description } = videoItem;

  const { dispatch } = useData();

  return (
    <>
      <Link to={`/videoDetails/${id}`} className="link">
        <div className="video-card">
          <div className="video-thumbnail">
            <img
              src={thumbnail}
              alt="thumbnail"
              // width="400px"
              // height="200px"
              className="video-thumbnail-image"
            />
          </div>
          <div className="video-content">
            <div className="video-title">
              <strong>{title}</strong>
            </div>
            {/* <div className="video-stats">{statistics}</div> */}
            <div className="video-description">{description}</div>
          </div>
        </div>
      </Link>
      <button
        className="btn btn-primary"
        onClick={() =>
          dispatch({ type: "REMOVE_FROM_HISTORY", payload: videoItem })
        }
      >
        Remove
      </button>
    </>
  );
}
