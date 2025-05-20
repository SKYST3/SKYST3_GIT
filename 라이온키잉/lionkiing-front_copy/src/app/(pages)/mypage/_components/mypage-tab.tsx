import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/_core/components/tabs';
import { LockKeyhole } from 'lucide-react';
import { FakeAlert } from './fake-alert';
import { Video } from '@/app/_common/interfaces/video.interface';
import ReactPlayer from 'react-player';
export default function MyPageTab({ video }: { video: Video[] }) {
  return (
    <Tabs defaultValue='tab-1' className='relative items-center w-full h-[70%]'>
      <TabsList className='w-full h-auto rounded-none border-b bg-transparent p-0 transition-all duration-300'>
        <TabsTrigger
          value='tab-1'
          className='data-[state=active]:after:bg-primary relative rounded-none py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex-1'
        >
          영상 업로드
        </TabsTrigger>
        <TabsTrigger
          value='tab-2'
          className='data-[state=active]:after:bg-primary relative rounded-none py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none flex-1'
        >
          투표 영상
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value='tab-1'
        className='relative pt-10 w-full flex justify-center items-center'
      >
        <div className=' flex flex-col justify-center items-center gap-2 opacity-50'>
          <h2>영상 업로드(url)</h2>
          <button
            className='w-auto h-auto px-4 py-2 border border-gray-300 bg-white shadow-xl rounded-xl'
            disabled={true}
          >
            Video Upload
          </button>
        </div>
        <LockKeyhole className='absolute top-0 left-0 w-full h-auto opacity-25' />
        <FakeAlert />
      </TabsContent>
      <TabsContent
        value='tab-2'
        className='px-8 py-4 pb-20 w-full h-full flex flex-col gap-4 overflow-y-auto scrollbar-hide'
      >
        {video.map(v => (
          <div key={v.id} className='w-full h-full rounded-xl'>
            <ReactPlayer url={v.url} width='100%' height='100%' controls />
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
}
