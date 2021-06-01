import "./Home.css";
import { data } from "../../data/data";
import { VideoCard } from "../../components/VideoCard/VideoCard";

export function Home() {
  const { videos } = data;

  return (
    <div className="home-page">
      <div className="video-container">
        {videos.map((video) => (
          <VideoCard key={video?.id} videoItem={video} />
        ))}
      </div>
    </div>
  );
}
