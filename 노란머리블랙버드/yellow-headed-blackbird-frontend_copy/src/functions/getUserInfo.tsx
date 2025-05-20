// localStorage에서 access token을 가져와, /api/user/me/에 GET 요청
// 회원 정보 (username, nickname) 불러와 localStorage에 저장 및 return

// * 이전에 불러온 username 정보가 있다면 api 호출하지 않고
//   localStorage 값을 그대로 return

export async function getUserInfo() {
  if (!localStorage.getItem('access')) {
    // 로그인 토큰이 없을 경우 빈 userinfo를 return
    return {
      username: '',
      nickname: '',
      experience: 0,
      loggedin: false,
      settings: {
        alarm: 0,
        alarm_ui: 0,
      },
    };
  } else {
    // (1) 만약 localStorage에 username 정보가 있다면,
    //     그대로 username과 nickname, 그리고 experience를 return
    const username = localStorage.getItem('username');
    const nickname = localStorage.getItem('nickname');
    const experience = localStorage.getItem('experience');
    const settings = localStorage.getItem('settings');
    if (username && username?.length >= 1) {

      return {
        username: username,
        nickname: nickname,
        experience: experience,
        settings: settings,
        loggedin: true,
      };
    }

    // (2) 만약 localStorage에 username 정보가 없다면,
    //     API 호출 후 받은 정보를 localStorage에 저장 후 return
    try {
      const url = '/api/user/me/';
      const resJson = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      }).then((res) => res.json());

      //console.log(resJson);
      localStorage.setItem('username', resJson.username);
      localStorage.setItem('nickname', resJson.nickname);
      localStorage.setItem('experience', resJson.experience);
      localStorage.setItem('settings', resJson.settings);

      return {
        username: resJson.username,
        nickname: resJson.nickname,
        experience: resJson.experience,
        settings: resJson.settings,
        loggedin: true,
      };
    } catch (error) {
      // 서버 에러의 경우 빈 userinfo를 return
      return {
        username: '',
        nickname: '',
        experience: 0,
        settings: {
          alarm: 0,
          alarm_ui: 0,
        },
        loggedin: false,
      };
    }
  }
}
