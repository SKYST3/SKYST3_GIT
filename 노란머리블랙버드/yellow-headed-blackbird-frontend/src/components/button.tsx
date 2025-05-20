import React from 'react';

interface OurButtonProps {
  dataIconExists: boolean;
  dataProperty1: string;
  dataInput: string;
  img?: {
    src: string;
    alt?: string;
  };
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export const OurButton: React.FC<OurButtonProps> = ({
  dataIconExists,
  dataProperty1,
  dataInput,
  img,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-10 py-2.5 ${dataProperty1 === 'btn-filled' ? 'bg-[#685e5e]' : 'outline-1 outline-offset-[-1px] outline-[#c7c7c7]'}
      rounded-[40px] inline-flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer`}
    >
      <div
        className={`justify-start text-white ${dataProperty1 === 'btn-filled' ? 'text-white' : 'text-[#c7c7c7'} text-2xl font-normal font-['Inter']`}
      >
        {dataInput}
      </div>
      {dataIconExists && img != null && (
        <div className="w-6 h-6 relative overflow-hidden">
          <img src={img.src} alt={img.alt} className="w-6 h-6" />
        </div>
      )}
    </button>
  );
};

export default OurButton;
