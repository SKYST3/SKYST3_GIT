import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/result')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen w-full gap-8 flex flex-col justify-center items-center px-4 py-6 bg-white bg-[url('/images/result_bg.png')] bg-no-repeat bg-top bg-cover">
      <h1 className="text-xl text-white font-semibold mb-4 text-center">
        당신은 얼마나 열심히 응원했나요?
      </h1>
      <p className="text-white">결과는 맨 앞 스크린에서 확인할 수 있어요.</p>
    </div>
  );
}
