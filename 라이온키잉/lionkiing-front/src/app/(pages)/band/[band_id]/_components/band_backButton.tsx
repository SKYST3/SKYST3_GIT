'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
function BackButton() {
  return (
    <Link href='/final'>
      <button className='size-10 flex justify-center items-center bg-white rounded-full'>
        <ChevronLeft className='w-6 h-6 text-black' />
      </button>
    </Link>
  );
}

export default BackButton;
