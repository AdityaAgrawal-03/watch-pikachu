import React from "react";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { Playlists } from "./pages/Playlists/Playlists";
import { LikedVideos } from "./pages/Liked/Liked";
import { History } from "./pages/History/History";
import { VideoDetails } from "./pages/VideoDetails/VideoDetails";
import { PlaylistDetails } from "./pages/PlaylistDetails/PlaylistDetails";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
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
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/video/:videoId" element={<VideoDetails />} />
        <PrivateRoute path="/playlist/:playlistId" element={<PlaylistDetails />} />
      </Routes>
    </div>
  );
}

export default App;
