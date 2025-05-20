import { useEffect, useState } from 'react';

import GrayPencil from '../assets/icons/ic_pencil_gray.svg';
import Plant from '../assets/images/img_plant.png';
import Sidebar from '../components/sidebar';
import { getUserInfo } from '../functions/getUserInfo';
import { getTier } from '../functions/getTier';

export const Settings = () => {
  //
  const [userInfo, setUserInfo] = useState({
    username: '',
    nickname: '',
    settings: {
      alarm: 0,
      alarm_ui: 0,
    },
    experience: 0,
    loggedin: false,
  });

  const [tierDb, setTierDb] = useState({ 새싹: 10000 } as {
    [key: string]: number;
  });

  const [alarmInterval, setAlarmInterval] = useState(0);
  const [showSunrise, setShowSunrise] = useState(true);

  // bind alarmInterval and showSunrise to userInfo
  useEffect(() => {
    if (userInfo.loggedin) {
      const settings = {
        alarm: alarmInterval,
        alarm_ui: showSunrise ? 1 : 0,
      };
      localStorage.setItem('settings', JSON.stringify(settings));
      setUserInfo((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          alarm: alarmInterval,
          alarm_ui: showSunrise ? 1 : 0,
        },
      }));
    }
  }, [alarmInterval, showSunrise]);

  // On component mount
  useEffect(() => {
    // Handle user info
    getUserInfo().then((data) => {
      setUserInfo(data);
      setAlarmInterval(data.settings.alarm);
      setShowSunrise(data.settings.alarm_ui === 1);
    });

    // Handle tier
    getTier().then((data) => {
      setTierDb(data);
    });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-row overflow-hidden">
      <Sidebar />
      <div className="w-full max-h-screen relative bg-[#0f0808] text-white">
        <div className="p-20 absolute inline-flex flex-col justify-start items-start gap-10">
          {/* Name */}
          <div className="flex flex-col justify-between items-start">
            <div className="inline-flex justify-center items-center gap-2.5">
              <h1>{userInfo.nickname}님의 정보</h1>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-10">
            {/* Profile */}
            <div className="inline-flex justify-start items-center gap-20">
              <img className="w-32 h-32" src={Plant} />
              <div className="inline-flex flex-col justify-center items-start gap-10">
                <div className="inline-flex justify-start items-start gap-5">
                  <div className="justify-start text-white text-2xl font-semibold">
                    현재{' '}
                    {userInfo.experience != null
                      ? Object.entries(tierDb).find(([key, value]) => {
                          return (value ?? 0) > userInfo.experience;
                        })?.[0] || '최고 티어'
                      : '새싹'}{' '}
                    단계
                  </div>
                  <div className="w-10 h-10 relative bg-[#584d4d] rounded-[32px] overflow-hidden">
                    <div className="w-6 h-6 left-[8px] top-[8.50px] absolute overflow-hidden">
                      <img className="w-6 h-6" src={GrayPencil} />
                    </div>
                  </div>
                </div>
                <div className="w-[510px] h-5 inline-flex justify-start items-center gap-12">
                  <div className="w-[415px] h-5 bg-[#242121] rounded-[20px]">
                    <div className="w-[] h-5 bg-[#685e5e] rounded-[20px]"></div>
                  </div>
                  <div className="justify-start text-[#c7c7c7] text-2xl font-semibold font-['Inter']">
                    {(() => {
                      const nextTierKey =
                        Object.values(tierDb).find(
                          (values) => (values ?? 0) > userInfo.experience,
                        ) ?? 10000;

                      const nextTierValue = tierDb[nextTierKey] || 1; // prevent division by 0 or undefined

                      return userInfo.experience / nextTierValue;
                    })()}
                    %
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="self-stretch flex flex-col justify-start items-start gap-10">
              {/* Divider */}
              <div className="self-stretch h-px bg-[#685e5e]"></div>

              {/* Settings */}
              <div className="self-stretch flex flex-col justify-start items-start gap-10">
                <div className="inline-flex justify-start items-center">
                  <h2>설정</h2>
                </div>
                <div className="flex flex-col justify-start items-start gap-4">
                  {/* Alarm Interval */}
                  <div className="w-full inline-flex justify-between items-center">
                    <div className="justify-start text-white font-semibold font-['Inter']">
                      알림 주기
                    </div>
                    <div className="w-[466px] bg-[#242121] rounded-[20px] flex justify-start items-center overflow-hidden">
                      <div
                        onClick={() => {
                          setAlarmInterval(0);
                        }}
                        className={`flex-1 px-3 py-2 ${alarmInterval === 0 ? 'bg-[#685e5e] rounded-[20px] outline-1 outline-offset-[-1px] outline-black' : ''} flex justify-center items-center cursor-pointer`}
                      >
                        <div className="justify-start text-[#c7c7c7]">
                          알림 X
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setAlarmInterval(30);
                        }}
                        className={`flex-1 px-3 py-2 ${alarmInterval === 30 ? 'bg-[#685e5e] rounded-[20px] outline-1 outline-offset-[-1px] outline-black' : ''} flex justify-center items-center cursor-pointer`}
                      >
                        <div className="justify-start text-[#c7c7c7]">
                          30분마다
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setAlarmInterval(60);
                        }}
                        className={`flex-1 px-3 py-2 ${alarmInterval === 60 ? 'bg-[#685e5e] rounded-[20px] outline-1 outline-offset-[-1px] outline-black' : ''} flex justify-center items-center cursor-pointer`}
                      >
                        <div className="justify-start text-[#c7c7c7]">
                          1시간마다
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show Sunrise */}
                  <div className="w-[782px] inline-flex justify-between items-center">
                    <div className="justify-start text-white font-semibold font-['Inter']">
                      일출 UI 표시 여부
                    </div>
                    <div className="w-[466px] bg-[#242121] rounded-[20px] flex justify-start items-center overflow-hidden">
                      <div
                        onClick={() => {
                          setShowSunrise(true);
                        }}
                        className={`flex-1 px-3 py-2 ${showSunrise ? 'bg-[#685e5e] rounded-[20px]' : ''} flex justify-center items-center gap-2.5 cursor-pointer`}
                      >
                        <div className="justify-start text-[#c7c7c7] font-normal font-['Inter']">
                          표시
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setShowSunrise(false);
                        }}
                        className={`flex-1 px-3 py-2 ${!showSunrise ? 'bg-[#685e5e] rounded-[20px]' : ''} flex justify-center items-center gap-2.5 cursor-pointer`}
                      >
                        <div className="justify-start text-[#c7c7c7] font-normal font-['Inter']">
                          표시 X
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
