import { useData } from "../../context/DataContext/DataContext";
import { HistoryVideoCard } from "../../components/HistoryVideoCard/HistoryVideoCard";
import "./History.css";

export function History() {
  const {
    state: { history },
    dispatch,
  } = useData();

  return (
    <div className="history-page">
      <div className="history-page-heading">
        <h1>History</h1>
        <button
          className="btn btn-clear-history"
          onClick={() => dispatch({ type: "CLEAR_SEARCH_HISTORY" })}
        >
          <span className="material-icons-round">delete</span>
          Clear All Watch History
        </button>
      </div>

      <div className="history-videos-container">
        {history.map((videoItem) => (
          <HistoryVideoCard key={videoItem.id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
