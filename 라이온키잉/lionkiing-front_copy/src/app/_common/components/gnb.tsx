'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { House, Video, User, Youtube, Play, WalletCards } from 'lucide-react';
import { cn } from '@/app/_core/utils/cn';
import Image from 'next/image';

const gnbItems = [
  {
    href: '/',
    icon: House,
  },
  {
    href: '/preliminary',
    icon: Play,
  },
  {
    href: '/final',
    icon: WalletCards,
  },
  {
    href: '/mypage',
    icon: User,
  },
];

const GNB = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50'>
      <div className='min-w-[360px] max-w-[415px] lg:max-w-[375px] mx-auto px-4 bg-black/80 rounded-b-4xl'>
        <div className='flex justify-around items-center h-16'>
          {gnbItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='relative size-10 flex flex-col items-center justify-center'
            >
              <item.icon
                className={cn(
                  'size-6 z-10',
                  isActive(item.href) ? 'text-black' : 'text-black/50',
                )}
                strokeWidth={3}
              />
              <img
                src={`/images/gnb-background.jpg`}
                alt={item.href}
                className='size-10 absolute top-0 left-0'
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default GNB;
