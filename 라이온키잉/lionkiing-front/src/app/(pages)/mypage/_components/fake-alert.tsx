import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/_core/components/alert-dialog';
import { Button } from '@/app/_core/components/button';
import { KeySquare } from 'lucide-react';
import Image from 'next/image';

export function FakeAlert() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='absolute top-0 right-4 hover:border-gray-600 hover:text-gray-600 transition-all duration-300 cursor-pointer bg-white rounded-full p-2 border-2 border-gray-300'>
          <KeySquare className=' size-8 opacity-25 ' />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className='w-[300px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Fake!</AlertDialogTitle>
          <AlertDialogDescription>
            <img
              src='/images/fake-key.jpeg'
              alt='mypage-background'
              width={300}
              height={200}
              className='object-contain'
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='w-full cursor-pointer'>
            😭😭😭😭😭
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
