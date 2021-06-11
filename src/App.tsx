import React from "react";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Header } from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import { Playlists } from "./pages/Playlists/Playlists";
import { LikedVideos } from "./pages/Liked/Liked";
import { History } from "./pages/History/History";
import { VideoDetails } from "./pages/VideoDetails/VideoDetails";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/liked" element={<LikedVideos />} />
        <Route path="/history" element={<History />} />
        <Route path="/videoDetails/:videoId" element={<VideoDetails />} />
      
      </Routes>
    </div>
  );
}

export default App;
