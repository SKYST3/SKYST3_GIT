// 밤샘 기록(Diary)에 ended_time 추가함으로써써 종료

export async function endDiary(id: number) {
  if (!localStorage.getItem('access')) {
    return null;
  } else {
    try {
      const url = `/api/diaries/${id}/`;
      const resJson = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          ended_time: new Date().toISOString(),
        }),
      }).then((res) => res.json());

      //console.log(resJson);

      return resJson;
    } catch (error) {
      return null;
    }
  }
}
