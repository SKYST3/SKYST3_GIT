export default function RankBadge({ rank }: { rank: number }) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-primary-yellow border-primary-yellow';
    if (rank === 2) return 'text-silver border-silver';
    if (rank === 3) return 'text-bronze border-bronze';
  };
  if (rank > 3) return null;
  return (
    <div
      className={`absolute top-[-10px] left-[-10px] size-8 border-2 ${getRankColor(rank)} bg-white rounded-full flex justify-center items-center`}
    >
      <p className='text-2xl font-bold'>{rank}</p>
    </div>
  );
}
