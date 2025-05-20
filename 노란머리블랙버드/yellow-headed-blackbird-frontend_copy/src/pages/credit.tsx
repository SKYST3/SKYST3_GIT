import { useEffect, useState } from 'react';

import { CaffeineItem, TaskItem } from '../components/credComponents';
import { Timeline } from '../components/credTimeline';
import { getDiaries, getDiary } from '../functions/getDiaries';
import { getUserInfo } from '../functions/getUserInfo';
import { Link } from 'react-router-dom';
import { getNatureEvents } from '../functions/getNatureEvent';

export const Credit = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    loggedin: false,
  });
  const [diaryData, setDiaryData] = useState({
    id: 0,
    title: '',
    description: '',
    created_time: '',
    due_time: '',
    ended_time: '',
    focus_time: {},
    task_details: [],
    caffeine_details: [],
  });
  const [dateText, setDateText] = useState('');
  const [totalCaff, setTotalCaff] = useState(0);
  const [natureEvent, setNatureEvent] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    interface IDiary {
      id: number;
    }
    async function getDiaryData() {
      try {
        const diaries = (await getDiaries()).results.sort(
          (a: IDiary, b: IDiary): number => b.id - a.id,
        );
        // 가장 최근의 Diary 데이터 요청
        const diaryId = diaries[0].id;
        const diary = await getDiary(diaryId);
        setDiaryData(diary);

        // 데이터 처리
        diary.task_details.sort((a: any, b: any) => a.order - b.order);
        let sum = 0;
        for (let i = 0; i < diary.caffeine_details.length; i++) {
          sum += diary.caffeine_details[i].amount;
        }
        setTotalCaff(sum);

        const date = diary.ended_time;
        setDateText(
          `${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(8, 10)}일`,
        );

        //console.log(diary.created_time);
        const natureEvent = await getNatureEvents(
          diary.created_time,
          diary.ended_time,
        );
        setNatureEvent(natureEvent[2]);
        //console.log(natureEvent);

        //console.log(diary);
      } catch {}
      setIsLoading(false);
    }

    if (diaryData.id == 0) {
      getUserInfo().then((data) => {
        setUserInfo(data);
      });
      getDiaryData();
    }
  }, []);

  const EndingCreditPage = () => (
    <div className="md:w-1/2 mx-auto space-y-24">
      <section className="space-y-4 fade-in">
        <h1 className="text-blue-200">Ending Credit</h1>
        <h2>- {dateText}의 밤샘 -</h2>
      </section>

      <section className="space-y-4 fade-in">
        <h2>오늘의 밤샘 목표: {diaryData.title}</h2>
        <div>{diaryData.description}</div>
      </section>

      <section className="space-y-4 fade-in">
        <h2 className="text-blue-200">오늘밤 이룬 일들</h2>
        <div className="grid grid-cols-1 space-y-4">
          {diaryData.task_details?.map((data: any, key: number) => (
            <TaskItem key={key} taskData={data} />
          ))}
        </div>
      </section>

      <section className="space-y-4 fade-in">
        <h2 className="text-blue-200">카페인 섭취</h2>
        <div>총 {totalCaff}mg의 카페인을 섭취했어요.</div>
        <div className="grid grid-cols-1 space-y-4">
          {diaryData.caffeine_details?.map((data: any, key: number) => (
            <CaffeineItem key={key} caffData={data} />
          ))}
        </div>
        <div className="text-[#969696] text-sm italic">
          <div>
            성인 기준 하루 400mg 이하, 임산부는 하루 300mg 이하, 어린이는 체중
            1kg당 2.5mg 이하 섭취가 권장됩니다.
          </div>
          <div>(식품의약품안전처 권장 기준)</div>
        </div>
      </section>

      <section className="space-y-4 fade-in">
        <h2 className="text-blue-200">타임라인</h2>
        <Timeline
          created_time={diaryData.created_time}
          ended_time={diaryData.ended_time}
          tasksData={diaryData.task_details}
          caffsData={diaryData.caffeine_details}
        />
      </section>

      <section className="space-y-16 fade-in">
        <div className="space-y-2">
          <h2>{userInfo.nickname}님, 오늘도 수고했어요.</h2>
          <div className="mt-8">
            밤샘 종료 시점에 활동한 새: {natureEvent?.name}
          </div>
          <div className="text-blue-200">{natureEvent?.description}</div>
        </div>
        <Link className="button" to="/">
          메인으로
        </Link>
      </section>
    </div>
  );

  return (
    <div
      className="min-w-screen min-h-screen text-white px-8 py-24 text-center
       bg-gradient-to-b from-black to-[#0F0909]"
    >
      {isLoading ? (
        <div>데이터 불러오는 중...</div>
      ) : diaryData.id === 0 || !userInfo.loggedin ? (
        <>
          <div>데이터가 없습니다.</div>
        </>
      ) : (
        <EndingCreditPage />
      )}
    </div>
  );
};

export default Credit;
