import { useData } from "../../context/DataContext/DataContext";
import { HistoryVideoCard } from "../../components/HistoryVideoCard/HistoryVideoCard";
import "./History.css";
import axios from "axios";
import { API_URL } from "../../utils/index"
import { useEffect } from "react";

export function History() {
  const {
    state: { history },
    dispatch,
  } = useData();

  const removeAllHistory = async () => {
    const {
      data: { success },
    } = await axios.delete(
      `${API_URL}/history`
    );
   
    if (success) {
      dispatch({ type: "CLEAR_SEARCH_HISTORY" });
    }
  };

  useEffect(() => {
    document.title = "Pikachu | History"
  }, [])

  return (
    <div className="history-page">
      <div className="history-page-heading">
        <h1>History</h1>
        <button
          className="btn btn-clear-history"
          onClick={() => removeAllHistory()}
        >
          <span className="material-icons-round">delete</span>
          Clear All Watch History
        </button>
      </div>

      <div className="history-videos-container">
        {history.map((videoItem) => (
          <HistoryVideoCard key={videoItem._id} videoItem={videoItem} />
        ))}
      </div>
    </div>
  );
}
