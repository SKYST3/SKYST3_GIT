
import { useEffect, useState } from 'react';


import BrownAdd from '../../assets/icons/ic_add_brown.svg';
import GrayCheck from '../../assets/icons/ic_check_gray.svg';
import GrayClose from '../../assets/icons/ic_close_gray.svg';
import Flag from '../../assets/icons/ic_flag.svg';
import OurButton from '../../components/button';
import { Subtask } from '../../components/subtask';
import '../main padding top.css';
import { startStep3 } from '../../functions/startStep3';

export const Step2 = ({ setStep }: { setStep: (step: number) => void }) => {
  const [cardEditorVisible, setCardEditorVisible] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [newCardVisible, setNewCardVisible] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [newCardDueDate, setNewCardDueDate] = useState('');

  const [diaryDueDate, setDiaryDueDate] = useState('');

  // diaryDueDate를 현재 시각으로 초기화
  useEffect(() => {
    const now = new Date(Date.now() - new Date().getTimezoneOffset() * 60000);
    const formattedDate = now.toISOString().slice(0, 16);
    setDiaryDueDate(formattedDate);
    setNewCardDueDate(formattedDate);
  }, []);

  interface Card {
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  }

  const [cards, setCards] = useState<Card[]>([
    {
      title: '할 일 1',
      description: '샘플 할 일 1',
      dueDate: '2025-05-11T02:00',
      completed: false,
    },
    {
      title: '할 일 2',
      description: '샘플 할 일 2',
      dueDate: '2025-05-11T05:30',
      completed: false,
    },
  ]);

  const handleDeleteCard = (index: number) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (
    <div className="w-full h-screen flex flex-row bg-[#0F0909]">
      <div className="inline-flex p-20 items-center gap-[100px]">
        <div className="inline-flex flex-col justify-start items-start gap-[31px] text-white">
          <div className="inline-flex items-end gap-3">
            <div className="flex justify-start items-center gap-[5px]">
              <h1>오늘의 목표</h1>
            </div>
            <div className="justify-start text-white text-xl font-semibold font-['Inter']">
              {`UNTIL `}
              <input
                className="justify-start text-white text-2xl font-normal font-['Inter'] underline"
                placeholder="날짜를 입력하세요.."
                type="datetime-local"
                value={diaryDueDate}
                onChange={(e) => {
                  setDiaryDueDate(e.target.value);
                }}
              />
            </div>
          </div>

          {/* Task List */}
          <div className="h-96 p-2.5 flex flex-col justify-start items-center gap-[30px] overflow-scroll">
            {cards.map((card, index) => (
              <Subtask
                key={index}
                dataCheckboxExists={false}
                dataBoxChecked="unchecked"
                archived={false}
                title={card.title}
                content={card.description}
                dueDate={card.dueDate}
                onClick1={() => {
                  setNewCardVisible(false);
                  setCardEditorVisible(true);
                  setNewCardTitle(card.title);
                  setNewCardDescription(card.description);
                  setNewCardDueDate(card.dueDate);
                  setEditIndex(index);
                }}
                onClick3={(e) => {
                  e.stopPropagation();
                  handleDeleteCard(index);
                }}
              />
            ))}
          </div>
        </div>
        <div className="w-96 h-96 inline-flex flex-col justify-center gap-8">
          {/* New Task */}
          {!newCardVisible && !cardEditorVisible && (
            <button
              onClick={() => {
                setNewCardVisible(true);
              }}
              className="w-96 h-96 px-10 py-[60px] bg-[#170d0d] rounded-[30px] outline outline-1 outline-offset-[-0.50px] outline-[#685e5e] flex flex-col justify-center items-center gap-[30px]"
            >
              <div className="w-[269px] inline-flex justify-between items-center">
                <div className="justify-start text-[#685e5e] text-lg">
                  새 항목 추가하기
                </div>
                <div className="w-8 h-8 relative overflow-hidden">
                  <img src={BrownAdd} alt="Add" className="w-8 h-8" />
                </div>
              </div>
            </button>
          )}
          {newCardVisible && !cardEditorVisible && (
            <div className="w-96 h-96 self-stretch px-10 pt-[60px] pb-[30px] bg-[#242121] rounded-[30px] outline outline-1 outline-[#685e5e] inline-flex flex-col gap-[30px]">
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <input
                  className=" justify-start text-[#c7c7c7] text-2xl font-bold font-['Inter']"
                  placeholder="제목을 입력하세요.."
                  value={newCardTitle}
                  onChange={(e) => {
                    setNewCardTitle(e.target.value);
                  }}
                />
                <div className="self-stretch flex flex-col justify-center items-start gap-2">
                  <div className="self-stretch inline-flex justify-start items-center gap-2">
                    <div className="justify-start text-white font-semibold font-['Inter']">
                      마감 기한
                    </div>
                    <input
                      className="flex-1 justify-start text-[#c7c7c7]"
                      placeholder="날짜를 입력하세요.."
                      type="datetime-local"
                      value={newCardDueDate}
                      onChange={(e) => {
                        setNewCardDueDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-[#685e5e]"></div>
              <textarea
                className=" text-start items-start justify-start text-[#c7c7c7] font-normal font-['Inter']"
                placeholder="설명을 추가하세요.."
                value={newCardDescription}
                onChange={(e) => {
                  setNewCardDescription(e.target.value);
                }}
              />

              {/* Buttons */}
              <div className="w-full items-end justify-end mt-0 h-16 flex-row inline-flex gap-5">
                <button
                  onClick={() => {
                    setNewCardVisible(false);
                    setNewCardTitle('');
                    setNewCardDescription('');
                    setNewCardDueDate('');
                  }}
                  className="w-16 h-16 relative bg-[#584d4d] rounded-[32px] overflow-hidden"
                >
                  <div className="w-10 h-10 left-[12px] top-[12px] absolute overflow-hidden">
                    <img src={GrayClose} alt="Close" className="w-10 h-10" />
                  </div>
                </button>
                <button
                  onClick={() => {
                    const updatedCards = [...cards];
                    updatedCards.push({
                      title: newCardTitle,
                      description: newCardDescription,
                      dueDate: newCardDueDate,
                      completed: false,
                    });
                    setCards(updatedCards);
                    setNewCardVisible(false);
                    setNewCardTitle('');
                    setNewCardDescription('');
                    setNewCardDueDate('');
                  }}
                  className="w-16 h-16 relative bg-[#584d4d] rounded-[32px] overflow-hidden"
                >
                  <div className="w-8 h-8 left-[16px] top-[16px] absolute overflow-hidden">
                    <img src={GrayCheck} alt="Check" className="w-8 h-8" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Card Editor */}
          {cardEditorVisible && (
            <div className="w-96 h-96 self-stretch px-10 pt-[60px] pb-[30px] bg-[#242121] rounded-[30px] outline outline-1 outline-[#685e5e] inline-flex flex-col gap-[30px]">
              <div className="self-stretch flex flex-col justify-start items-start gap-4">
                <input
                  className="ustify-start text-[#c7c7c7] text-2xl font-bold"
                  placeholder="제목을 입력하세요.."
                  value={newCardTitle}
                  onChange={(e) => {
                    setNewCardTitle(e.target.value);
                  }}
                />
                <div className="self-stretch flex flex-col justify-center items-start gap-5">
                  <div className="self-stretch inline-flex justify-start items-center gap-5">
                    <div className="justify-start text-white">마감 기한</div>
                    <input
                      className="flex-1 justify-start text-[#c7c7c7]"
                      placeholder="날짜를 입력하세요.."
                      type="datetime-local"
                      value={newCardDueDate}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setNewCardDueDate(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="self-stretch h-px bg-[#685e5e]"></div>
              <textarea
                className="text-start items-start justify-start text-[#c7c7c7]"
                placeholder="설명을 추가하세요.."
                value={newCardDescription}
                onChange={(e) => {
                  setNewCardDescription(e.target.value);
                }}
              />

              {/* Buttons */}
              <div className="w-full items-end justify-end mt-0 h-16 flex-row inline-flex gap-5">
                <button
                  onClick={() => {
                    setNewCardVisible(false);
                    setCardEditorVisible(false);
                    setNewCardTitle('');
                    setNewCardDescription('');
                    setNewCardDueDate('');
                    setEditIndex(null);
                  }}
                  className="w-16 h-16 relative bg-[#584d4d] rounded-[32px] overflow-hidden"
                >
                  <div className="w-10 h-10 left-[12px] top-[12px] absolute overflow-hidden">
                    <img src={GrayClose} alt="Close" className="w-10 h-10" />
                  </div>
                </button>
                <button
                  onClick={() => {
                    if (editIndex === null) return;
                    const updatedCards = [...cards];
                    updatedCards[editIndex] = {
                      title: newCardTitle,
                      description: newCardDescription,
                      dueDate: newCardDueDate,
                      completed: false,
                    };
                    setCards(updatedCards);
                    setNewCardVisible(false);
                    setCardEditorVisible(false);
                    setNewCardTitle('');
                    setNewCardDescription('');
                    setNewCardDueDate('');
                    setEditIndex(null);
                  }}
                  className="w-16 h-16 relative bg-[#584d4d] rounded-[32px] overflow-hidden"
                >
                  <div className="w-8 h-8 left-[16px] top-[16px] absolute overflow-hidden">
                    <img src={GrayCheck} alt="Check" className="w-8 h-8" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={() => {
              localStorage.setItem('step', '3');
              setStep(3);
            }}
            className="h-14 bg-[#685e5e] rounded-full inline-flex justify-center items-center gap-2.5 overflow-hidden"
          >
            <OurButton
              onClick={() => {
                startStep3('밤샘', '설명', diaryDueDate, cards);
                localStorage.setItem('step', '3');
                setStep(3);
              }}
              dataIconExists={true}
              dataProperty1="btn-filled"
              dataInput="밤샘 시작하기"
              img={{
                src: Flag,
                alt: 'Icon',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2;
