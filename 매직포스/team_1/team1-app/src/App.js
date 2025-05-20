import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNavBar from './components/BottomNavBar';
import Home from './components/Home';
import { Photos } from './components/Photos';
import { PhotoDetail } from './components/PhotoDetail';
import FuneralPage from './pages/FuneralPage';
import { Music } from './components/Music';
import { PlaylistDetail } from './components/PlaylistDetail';
import { MusicRegister } from './components/MusicRegister';
import { Movies } from './components/Movies';
import { MovieDetail } from './components/MovieDetail';
import VoiceRecordingPage from './pages/VoiceRecordingPage';
import AudioPlayer from './components/AudioPlayer';
import AudioRecorder from './components/AudioRecorder';
import AIChatPage from './pages/AIChatPage';
import VoiceLearningPage from './pages/VoiceLearningPage'; // 🔥 새로 추가된 페이지
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
          <Route path="/music" element={<Music />} />
          <Route path="/music/playlist/:id" element={<PlaylistDetail />} />
          <Route path="/music/register" element={<MusicRegister />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/chat" element={<AIChatPage />} />
          <Route path="/funeral" element={<FuneralPage />} />
          <Route path="/voice" element={<VoiceLearningPage />} /> {/* 🔥 수정된 부분 */}
          <Route path="/audio-player" element={<AudioPlayer />} />
          <Route path="/audio-recorder" element={<AudioRecorder />} />
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;
