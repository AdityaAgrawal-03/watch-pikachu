import { useData } from "../../context/DataContext/DataContext";
import { LikedVideoCard } from "../../components/LikedVideoCard/LikedVideoCard";
import "./Liked.css";
import { useEffect } from "react";

export function LikedVideos() {
  const {
    state: { liked },
  } = useData();

  useEffect(() => {
    document.title = "Pikachu | Liked videos"
  }, [])

  return (
    <div className="liked-page">
      <h1>Liked</h1>
      <div className="liked-videos-container">
        {liked.map((videoItem) => (
          <LikedVideoCard key={videoItem?._id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
