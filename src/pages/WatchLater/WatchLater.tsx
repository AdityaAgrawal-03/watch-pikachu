import { useData } from "../../context/DataContext/DataContext";
import { WatchLaterVideoCard } from "../../components/WatchLaterVideoCard/WatchLaterVideoCard";

export function WatchLater() {
  const {
    state: { watchLater },
  } = useData();

  return (
    <>
      <h1>Watch later</h1>
      {watchLater.map((videoItem) => (
        <WatchLaterVideoCard key={videoItem.id} videoItem={videoItem} />
      ))}
    </>
  );
}
