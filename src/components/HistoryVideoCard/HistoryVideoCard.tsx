import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCardProps } from "../VideoCard/videocard.types";
import "./HistoryVideoCard.css";
import { API_URL } from "../../utils/index"

export function HistoryVideoCard({ videoItem }: VideoCardProps) {
  const { _id, thumbnail, title, description } = videoItem;

  const { dispatch } = useData();

  const removeFromHistoryHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { data: { success, historyVideos } } = await axios.post(`${API_URL}/history`, {
      video: {
        _id: _id
      }
    });
    console.log({ success, historyVideos });
    if (success) {
      dispatch({ type: "REMOVE_FROM_HISTORY", payload: videoItem });
    }
  }

  return (
    <>
      <Link to={`/video/${_id}`} className="link">
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
            onClick={(e) => removeFromHistoryHandler(e)}
          >
            <span className="material-icons-round">cancel</span>
          </button>
        </div>
      </Link>
    </>
  );
}
