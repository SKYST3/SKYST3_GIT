import './main padding top.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GrayClose from '../assets/icons/ic_close_gray.svg';
import OurButton from '../components/button.tsx';
import { Calendar } from '../components/calendar.tsx';
import { Sidebar } from '../components/sidebar.tsx';
import Subtask from '../components/subtask.tsx';
import { getDiariesBetweenTimezones, getTask } from '../functions/getDiaries.tsx';
import { getUserInfo } from '../functions/getUserInfo';

interface Task {
  title: string;
  description: string;
  due_time: string;
  completed: boolean;
}

interface TaskViewerProps {
  task: Task;
  setViewerAvailable: (viewerAvailable: boolean) => void;
}

const TaskViewer = ({ task, setViewerAvailable }: TaskViewerProps) => {
  return (
    <div className="w-[433px] h-[720px] px-10 pt-[60px] pb-[30px] bg-[#242121] rounded-[30px] outline outline-1 outline-[#685e5e] inline-flex flex-col gap-[30px]">
      <div className="self-stretch flex flex-col justify-start items-start gap-[30px]">
        <input
          className="w-[380px] justify-start text-[#c7c7c7] text-[40px] font-bold font-['Inter']"
          placeholder="제목을 입력하세요.."
          value={task.title}
          readOnly={true}
        />
        <div className="self-stretch flex flex-col justify-center items-start gap-5">
          <div className="self-stretch inline-flex justify-start items-center gap-5">
            <div className="justify-start text-white text-2xl font-semibold font-['Inter']">
              마감 기한
            </div>
            <span className="w-[277px] flex-1 justify-start text-[#c7c7c7] text-2xl font-normal font-['Inter']">
              {new Date(task.due_time).getFullYear()}.
              {new Date(task.due_time).getMonth()}.
              {new Date(task.due_time).getDate()}
            </span>
            {/*<input*/}
            {/*  className="w-[277px] flex-1 justify-start text-[#c7c7c7] text-2xl font-normal font-['Inter']"*/}
            {/*  placeholder="날짜를 입력하세요.."*/}
            {/*  type="datetime-local"*/}
            {/*  value={task.due_time}*/}
            {/*  readOnly={true}*/}
            {/*/>*/}
          </div>
        </div>
      </div>
      <div className="self-stretch h-px bg-[#685e5e]"></div>
      <textarea
        className="w-[392px] h-[389px] text-start items-start justify-start text-[#c7c7c7] text-2xl font-normal font-['Inter']"
        placeholder="설명을 추가하세요.."
        value={task.description}
        readOnly={true}
      />

      {/* Buttons */}
      <div className="w-full items-end justify-end mt-0 h-16 flex-row inline-flex gap-5">
        <button
          onClick={() => {
            setViewerAvailable(false);
          }}
          className="w-16 h-16 relative bg-[#584d4d] rounded-[32px] overflow-hidden"
        >
          <div className="w-10 h-10 left-[12px] top-[12px] absolute overflow-hidden">
            <img src={GrayClose} alt="Close" className="w-10 h-10" />
          </div>
        </button>
      </div>
    </div>
  );
};

export const Archive = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayingDate, setDisplayingDate] = useState(new Date());
  const [viewerAvailable, setViewerAvailable] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>({
    title: '',
    description: '',
    due_time: '',
    completed: false,
  });
  const [diaryExists, setDiaryExists] = useState(new Array(42).fill(0));
  const [diaries, setDiaries] = useState(new Array(42).fill(0));
  const [tasks, setTasks] = useState([] as Task[]);

  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    loggedin: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((data) => {
      setUserInfo(data);
    });
  }, []);
  function distance(date: Date) {
    const startDate = new Date(
      displayingDate.getFullYear(),
      displayingDate.getMonth(),
      1,
    );
    const dateDelta = startDate.getDay();
    startDate.setDate(startDate.getDate() - dateDelta);
    return Math.floor(
      (date.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24,
    );
  }
  useEffect(() => {
    console.log(`${displayingDate}`);
    const startDate = new Date(
      displayingDate.getFullYear(),
      displayingDate.getMonth(),
      1,
    );
    const dateDelta = startDate.getDay();
    startDate.setDate(startDate.getDate() - dateDelta);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    );
    endDate.setDate(startDate.getDate() + 42);
    const res = getDiariesBetweenTimezones(startDate, endDate);
    const tmp = Array(42).fill(0);
    const tmp2 = Array(42).fill([]);

    res.then(res => {
      res.results.map((it: { created_time: string | number | Date; tasks: unknown[]; }) => {
        const tmpDate = new Date(it.created_time);
        const tmp_idx =
          (tmpDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24;
        tmp[Math.floor(tmp_idx)] += it.tasks.length;
        it.tasks.map((i) => {
          tmp2[Math.floor(tmp_idx)].push(i);
        });
        // console.log(it);
        // tmp2[Math.floor(tmp_idx)] = it.tasks[0];
      });
      setDiaryExists(tmp);
      setDiaries(tmp2);
      // console.log(tmp2);
      // console.log(tmp);
      // console.log(tmp2);
    });
  }, [displayingDate]);

  useEffect(() => {
    if (diaryExists[distance(selectedDate)]) {
      // const tmpArr = [];
      setTasks([]);
      // console.log(diaries[distance(selectedDate)].length)

      diaries[distance(selectedDate)].map((it: number) => {
        getTask(it).then((v) => {
          console.log(v.description);
          const tmp = [...tasks];
          tmp.push(v);

          setTasks(tmp);
        });
      });
      // console.log(tmpArr);
      // setTasks(tmpArr);
      // console.log(tmpArr);
    } else {
      setTasks([]);
    }
    // console.log(getDiary())
    // setTasks(getDiae)
  }, [selectedDate]);

  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />
      {!userInfo.loggedin && (
        <div className="bg-[#0f0909] px-32 py-28  inline-flex flex-col justify-center items-center overflow-hidden">
          <div className="flex flex-col justify-center items-center gap-14">
            <div className="text-center justify-start text-white text-[32px] font-normal font-['Inter']">
              서비스를 이용하시려면 로그인해주세요
            </div>
            <div className="inline-flex justify-start items-start gap-14 flex-wrap content-start">
              <OurButton
                dataProperty1="btn-stroke"
                dataIconExists={false}
                dataInput="회원가입하기"
                onClick={() => {
                  navigate('/register');
                }}
              />

              <OurButton
                dataProperty1="btn-filled"
                dataIconExists={false}
                dataInput="로그인하러 가기"
                onClick={() => {
                  navigate('/login');
                }}
              />
            </div>
          </div>
        </div>
      )}
      {userInfo.loggedin && (
        <div className="w-full h-screen flex flex-row bg-[#0F0909]">
          <div className="w-[1640px] h-full bg-[#0f0909] px-32 py-28 inline-flex flex-col justify-between items-start overflow-hidden main">
            <div className="inline-flex justify-center items-center gap-[100px]">
              {!viewerAvailable && (
                <Calendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  diplayingDate={displayingDate}
                  setDisplayingDate={setDisplayingDate}
                  diaryExists={diaryExists}
                />
              )}
              {viewerAvailable && (
                <TaskViewer
                  task={currentTask}
                  setViewerAvailable={setViewerAvailable}
                />
              )}
              <div className="inline-flex flex-col justify-start items-start gap-[31px]">
                <div className="w-[720px] inline-flex justify-start items-center gap-3">
                  <div className="flex justify-start items-center gap-[5px]">
                    <div className="justify-start text-white text-xl font-bold font-['Inter']">
                      {`${selectedDate.getFullYear()}년 ${(
                        selectedDate.getMonth() + 1
                      )
                        .toString()
                        .padStart(
                          2,
                          '0',
                        )}월 ${selectedDate.getDate()}일의 목표`}
                    </div>
                  </div>
                </div>
                {/* Task List */}
                <div className="h-[766px] p-2.5 flex flex-col justify-start items-center gap-[30px] overflow-scroll">
                  {tasks.map((task, index) => (
                    // console.log("DDDD"+task.toString());
                    <Subtask
                      key={index}
                      dataCheckboxExists={false}
                      dataBoxChecked="unchecked"
                      archived={true}
                      title={task.title}
                      content={task.description}
                      dueDate={task.due_time}
                      onClick1={() => {
                        setCurrentTask(task);
                        setViewerAvailable(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Archive;
