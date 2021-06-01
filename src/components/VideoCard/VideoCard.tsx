import "./VideoCard.css";

import { Link } from "react-router-dom";
import { VideoCardProps } from "./videocard.types";
import { data } from "../../data/data";

export function VideoCard({ videoItem }: VideoCardProps) {
  const { videos } = data;

  const { id } = videoItem;

  const video = videos.find((currentVideo) => currentVideo.id === id);

  console.log({ video });

  return (
    <>
      <Link to={`/videoDetails/${video?.id}`} className="link">
        <div className="video-card">
          <div className="video-thumbnail">
            <img
              src={video?.thumbnail}
              alt="thumbnail"
              // width="400px"
              // height="200px"
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
