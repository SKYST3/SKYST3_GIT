export default function PageHeader({ title }: { title: string }) {
  return (
    <div className=' text-[#FFFA1A] text-[30px] font-bold py-3 text-center mb-6'>
      {title}
    </div>
  );
}
