import "./Home.css";
import { useData } from "../../context/DataContext/DataContext";
import { VideoCard } from "../../components/VideoCard/VideoCard";

export function Home() {
  const {
    state: { videos },
  } = useData();

  return (
    <div className="home-page">
      {!videos.length ? (
        <div className="spinner">
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <div className="video-container">
            {videos.map((video) => (
              <VideoCard key={video._id} videoItem={video} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
