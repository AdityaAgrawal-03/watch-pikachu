import { useData } from "../../context/DataContext/DataContext";
import { LikedVideoCard } from "../../components/LikedVideoCard/LikedVideoCard";
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
          <LikedVideoCard key={videoItem?._id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
