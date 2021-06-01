import { useData } from "../../context/DataContext/DataContext";
import { VideoCard } from "../../components/VideoCard/VideoCard";

export function LikedVideos() {
  const {
    state: { liked },
  } = useData();

  return (
    <>
      <h1>This is liked videos</h1>
      <h2>{liked.length}</h2>
      {liked.map((videoItem) => <VideoCard key={videoItem?.id} videoItem={videoItem} />)}
    </>
  );
}
