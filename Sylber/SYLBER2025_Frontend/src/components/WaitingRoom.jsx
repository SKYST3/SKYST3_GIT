import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { roomLeaveRequestApi, getNextApi, getRoomUsersApi, startApi, getUserInfoApi} from '../apis/usersApi';
import './WaitingRoom.css';
const WaitingRoom = () => {
    const {username} = useParams();
    const {room_code} = useParams();

    const [roomUsers, setRoomUsers] = useState([]);
    const [roomUserCount, setRoomUserCount] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        getUserInfoApi(username).then((response) => {
            if (response.status === 200) {
                console.log(response.data.username);
                if(response.data.room_code !== room_code){
                    navigate(`../${username}/main`);
                }
            }
        });
    }, []);

    const updateRoomUsers = (newUsers) => {
        const usernames = [];
        newUsers.forEach((user) => {
            usernames.push(user.username);
        });

        usernames.length = 8;
        setRoomUsers(usernames);
        setRoomUserCount(newUsers.length);
        console.log(roomUsers);
    }

    

    const goBackToMain = () => {
        roomLeaveRequestApi(room_code).then((response) => {
            if (response.status === 200) {
                console.log(response.data.code);
                navigate(`../${username}/main`);
            }
        });
    }

    const getNext = () => {
        getNextApi(room_code).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                if(response.data.round > 0){
                    navigate(`../${username}/room/${room_code}/text/${response.data.round}`);
                }
            }
        });
    }

    const getRoomUsers = () => {
        getRoomUsersApi(room_code).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
                updateRoomUsers(response.data.users);
            }
        });
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            getNext();
            // call your function here
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // empty dependency array = run once on mount

    useEffect(() => {
        const intervalId = setInterval(() => {
            getRoomUsers();
            // call your function here
        }, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // empty dependency array = run once on mount

    const start = () => {
        startApi(room_code).then((response) => {
            if (response.status === 200) {
                console.log(response.data);
            }
        });
    }


    return (
      <div className="room-host-page">

        <div className="room-sub-frames">

          <button className="back-to-start-button" onClick = {goBackToMain}>
            <span className="back-to-start-text">Back to Main</span>
          </button>

          <div className="room-game-logo-frame">
            <span className="room-game-logo-text">Catch Voice</span>
          </div>

          <div className="room-members-frame">
            <span className="room-members-text">{roomUserCount}/8</span>
          </div>

        </div>

        <div className="room-main-frames">
            <div className="player-frame">
                <div className="player-container-frame">
                    <div className="player-text-frame">
                        <span className="player-text">Players</span>
                    </div>
                    <div className="player-list-frame">
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[0]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[1]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[2]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[3]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[4]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[5]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[6]}</span></div>
                        <div className="player-item-frame"><span className = "player-text">{roomUsers[7]}</span></div>
                    </div>
                </div>
            </div>

          <div className="waiting-room-code-frame">
            <div className="room-code-container-frame">

              <div className="room-code-text-frame">
                <span className="room-code-text">Room Code</span>
              </div>

              <div className="room-code-real-text-frame">
              <span className="room-code-real-text">{room_code}</span>
              </div>

            </div>
            <div className="game-start-button-frame">
                <button className="game-start-button" onClick = {start}>
                    <span className="game-start-text">Start Game</span>
                </button>
            </div>
          </div>

        </div>

      </div>
    );
}

export default WaitingRoom;