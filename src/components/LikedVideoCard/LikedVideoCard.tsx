import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCardProps } from "../VideoCard/videocard.types";
import { API_URL } from "../../utils/index";

export function LikedVideoCard({ videoItem }: VideoCardProps) {
  const { _id: videoId, thumbnail, title, description } = videoItem;
  
  const { dispatch } = useData();

  const likedVideosHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const {
        data: { success, likedVideos },
      } = await axios.post(`${API_URL}/liked`, {
        video: {
          _id: videoId,
        },
      });
      console.log({ success, likedVideos });
      if (success) {
        dispatch({ type: "TOGGLE_LIKED", payload: videoItem });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Link to={`/video/${videoId}`} className="link">
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
            onClick={(e) => likedVideosHandler(e)}
          >
            <span className="material-icons-round">cancel</span>
          </button>
        </div>
      </Link>
    </>
  );
}
