import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EndRoom = () => {
    const {username} = useParams();
    const {room_code} = useParams();

    const navigate = useNavigate();

    const goBackToMain = () => {
        navigate(`../${username}/main`);
    }

    return (
        <div>
            <h1>Game Over</h1>
            <p>Thank you for playing!</p>
            <button onClick={goBackToMain}>Go Back to Main</button>
        </div>
    );
}

export default EndRoom;