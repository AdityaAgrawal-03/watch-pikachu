import axios from "axios";
import React from "react";
import { Link, useParams} from "react-router-dom";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCardProps } from "../VideoCard/videocard.types";
import { API_URL } from "../../utils/index"

export function PlaylistVideoCard({ videoItem }: VideoCardProps) {
  const { _id: videoId, thumbnail, title, description } = videoItem;
  const {playlistId} = useParams();
  const {dispatch} = useData();

  const updatePlaylist = async (e: React.SyntheticEvent, playlistId: string, ) => {
    e.preventDefault();
    try {
      const {
        data: { success, playlist },
      } = await axios.post(`${API_URL}/playlists/${playlistId}/${videoId}`);

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
            onClick={(e) => updatePlaylist(e, playlistId)}
          >
            <span className="material-icons-round">cancel</span>
          </button>
        </div>
      </Link>
    </>
  )
}