// 밤샘 페이지 step 2에서 step 3로 넘어갈 때, 백엔드에 새로운 diary와 task들 생성 요청

interface Card {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export async function startStep3(
  title: string,
  description: string,
  due_time: string,
  cards: Card[],
) {
  if (!localStorage.getItem('access')) {
    return null;
  } else {
    try {
      const url1 = '/api/diaries/';
      const newDiary = await fetch(url1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          due_time: due_time,
          focus_time: { data: [] },
        }),
      }).then((res) => res.json());

      const newDiaryId = newDiary.id;
      localStorage.setItem('diaryId', newDiaryId);

      const url2 = '/api/tasks/';
      cards.forEach((card) => {
        console.log(card);
        fetch(url2, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`,
          },
          body: JSON.stringify({
            diary_id: newDiaryId,
            title: card.title,
            description: card.description,
            order: 0,
            due_time: card.dueDate,
            finished_time: card.dueDate,
          }),
        }).then((res) => res.json());
      });

      return newDiaryId;
    } catch (error) {
      return null;
    }
  }
}
