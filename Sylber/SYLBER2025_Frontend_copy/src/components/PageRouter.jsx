import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginForm from './LoginForm'
import MainScreen from './MainScreen'
import SignupForm from './SignupForm'
import WaitingRoom from './WaitingRoom'
import GameRoomAudio from './GameRoomAudio'
import GameRoomText from './GameRoomText'
import EndRoom from './EndRoom'
import { useNavigate } from 'react-router-dom';

function PageRouter({}) {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginForm/>}/>
          <Route exact path="/signup" element={<SignupForm/>}/>
          <Route path="/:username/main" element={<MainScreen />} />
          <Route path="/:username/room/:room_code/waiting" element={<WaitingRoom />} />
          <Route path="/:username/room/:room_code/audio/:round" element={<GameRoomAudio />} />
          <Route path="/:username/room/:room_code/text/:round" element={<GameRoomText />} />
          <Route path="/:username/room/:room_code/end" element={<EndRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default PageRouter;