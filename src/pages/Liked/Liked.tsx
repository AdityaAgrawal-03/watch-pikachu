import { useData } from "../../context/DataContext/DataContext";
import { VideoCard } from "../../components/VideoCard/VideoCard";
import "./Liked.css";

export function LikedVideos() {
  const {
    state: { liked },
  } = useData();

  return (
    <div className="liked-page">
      <h1>Liked</h1>
      <div className="liked-videos-container">
        {liked.map((videoItem) => (
          <VideoCard key={videoItem?.id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
