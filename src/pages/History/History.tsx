import { useData } from "../../context/DataContext/DataContext";
import { HistoryVideoCard } from "../../components/HistoryVideoCard/HistoryVideoCard";

export function History() {
  const {
    state: { history },
    dispatch,
  } = useData();

  return (
    <>
      <h1>This is history</h1>
      <button
        className="btn"
        onClick={() => dispatch({ type: "CLEAR_SEARCH_HISTORY" })}
      >
        Clear All Search History
      </button>
      <div>
        {history.map((videoItem) => (
          <HistoryVideoCard key={videoItem.id} videoItem={videoItem} />
        ))}
      </div>
    </>
  );
}
