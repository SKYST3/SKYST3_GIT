import axios from 'axios';

export const backendURL = 'http://192.168.77.18:8000';

const API_URL = {
    SIGNUP_URL : '/auth',
    LOGIN_URL : '/auth/token',
    USER_INFO_URL : '/auth',
    ROOM_CREATE_URL : '/room',
    ROOM_JOIN_URL : '/room/join',
    ROOM_LEAVE_URL : '/room/leave',
    ROOM_URL : '/room',
    ROOM_USERS_URL : '/room/info',
}

const instance = axios.create({
  baseURL: backendURL,
  timeout: 10000,
});

instance.interceptors.request.use(function (config) {

    // 스토리지에서 토큰을 가져온다. 
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // 토큰이 있으면 요청 헤더에 추가한다. 
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // Refresh 토큰을 보낼 경우 사용하고자 하는 커스텀 인증 헤더를 사용하면 된다. 
    if (refreshToken) {
        config.headers['x-refresh-token'] = refreshToken;
    }

    return config;
}, function (error) {
    // 요청 오류 처리
    return Promise.reject(error);
});

export const LoginApi = async (name, password) => {
    try {
        const response = await instance.post(API_URL.LOGIN_URL, {
            username:name,
            password:password
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getUserInfoApi = async (username) => {
    try {
        const response = await instance.get(API_URL.USER_INFO_URL+'/me', {

        },
        {
            headers: {
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const SignUpApi = async (username, password) => {
    try {
        const response = await instance.post(API_URL.SIGNUP_URL, {
            username:username,
            password:password
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const roomCreateRequestApi = async (max_users = 8) => {
    try {
        const response = await instance.get(API_URL.ROOM_CREATE_URL, {
            max_users : max_users
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const roomJoinRequestApi = async (room_code) => {
    try {
        const response = await instance.get(API_URL.ROOM_JOIN_URL + '/' + room_code, {
            room_code : room_code
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const roomLeaveRequestApi = async (room_code) => {
    try {
        const response = await instance.get(API_URL.ROOM_LEAVE_URL + '/' + room_code, {
            room_code : room_code
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getNextApi = async (room_code) => {
    try {
        const response = await instance.get(API_URL.ROOM_URL + '/' + room_code + '/next', {
            room_code : room_code
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRoomUsersApi = async (room_code) => {
    try {
        const response = await instance.get(API_URL.ROOM_USERS_URL + '/' + room_code, {
            room_code : room_code
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const sendAudioApi = async (room_code, audio, round) => {
    try {
        const response = await instance.post(API_URL.ROOM_URL + '/' + room_code + '/answer', {
            audio : audio,
            round : round
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const startApi = async (room_code) => {
    try{
        const response = await instance.get(API_URL.ROOM_URL + '/' + room_code + '/start', {

        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const sendTextApi = async (room_code, text, round) => {
    try {
        const response = await instance.post(API_URL.ROOM_URL + '/' + room_code + '/answer', {
            text : text,
            round : round
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export const getRoundApi = async (room_code) => {
    try {
        const response = await instance.get(API_URL.ROOM_URL + '/' + room_code + '/round', {

        });
        return response;
    } catch (error) {
        throw error;
    }
}