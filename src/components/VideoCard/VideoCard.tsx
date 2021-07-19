import "./VideoCard.css";
import { useData } from "../../context/DataContext/DataContext";
import { Link } from "react-router-dom";
import { VideoCardProps } from "./videocard.types";

export function VideoCard({ videoItem }: VideoCardProps) {
  const { state: { videos } } = useData();
  // const { videos } = data;

  const { _id } = videoItem;

  const video = videos.find((currentVideo) => currentVideo._id === _id);

  console.log({ video });

  return (
    <>
      <Link to={`/video/${video?._id}`} className="link">
        <div className="video-card">
          <div className="video-thumbnail">
            <img
              src={video?.thumbnail}
              alt="thumbnail"
              className="video-thumbnail-image"
            />
          </div>
          <div className="video-content">
            <div className="video-title">
              <strong>{video?.title}</strong>
            </div>
            <div className="video-stats">{video?.statistics}</div>
            <div className="video-description">{video?.description}</div>
          </div>
        </div>
      </Link>
    </>
  );
}
