import "./Home.css";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCard } from "../../components/VideoCard/VideoCard";

export function Home() {
  const {
    state: { videos },
  } = useData();


  return (
    <div className="home-page">
      <div className="video-container">
        {videos.map((video) => (
          <VideoCard key={video._id} videoItem={video} />
        ))}
      </div>
    </div>
  );
}
