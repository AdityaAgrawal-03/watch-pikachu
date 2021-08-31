import "./App.css";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";

import {
  History,
  Home,
  Login,
  Signup,
  VideoDetails,
  PlaylistDetails,
  Playlists,
  LikedVideos,
} from "./pages/index";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
        <PrivateRoute path="/liked" element={<LikedVideos />} />
        <PrivateRoute path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
        <PrivateRoute
          path="/playlist/:playlistId"
          element={<PlaylistDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
