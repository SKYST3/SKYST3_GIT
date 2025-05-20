// localStorage에서 refresh token을 가져와, /api/token/refresh/에 POST 요청
// 새로운 access token 및 refresh token을 받아와서 localStorage에 저장 및 return

export async function refreshToken() {
  if (!localStorage.getItem('refresh')) {
    return null;
  } else {
    try {
      const url = '/api/token/refresh/';
      const resJson = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: localStorage.getItem('refresh') }),
      }).then((res) => res.json());

      //console.log(resJson);
      localStorage.setItem('access', resJson.access);

      return resJson;
    } catch (error) {
      return null;
    }
  }
}
