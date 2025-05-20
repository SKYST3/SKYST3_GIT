import { useEffect, useState } from 'react';

import { Sidebar } from '../../components/sidebar.tsx';
import { Credit } from '../credit.tsx';
import { Step1 } from '../current/step1.tsx';
import { Step2 } from '../current/step2.tsx';
import { Step3 } from '../current/step3.tsx';

export const Current = () => {
  const [step, setStep] = useState<number>();

  useEffect(() => {
    const storedStep = localStorage.getItem('step');
    if (storedStep != null) {
      setStep(parseInt(storedStep));
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-row">
      <Sidebar />

      <div className="flex-1 bg-[#f5f5f5]">
        <div className="flex justify-center items-center h-full">
          {step === 1 && <Step1 setStep={setStep} />}
          {step === 2 && <Step2 setStep={setStep} />}
          {step === 3 && <Step3 setStep={setStep} />}
        </div>
      </div>
    </div>
  );
};

export default Current;
