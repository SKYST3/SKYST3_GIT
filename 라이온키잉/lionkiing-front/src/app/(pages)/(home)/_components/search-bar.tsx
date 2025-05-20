'use client';

import { useSearchTextStore } from '@/app/_core/store/search-text.store';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const { searchText, setSearchText } = useSearchTextStore();
  return (
    <div className='min-w-0 w-full h-auto flex justify-start items-center gap-3 bg-white rounded-xl px-4 py-2 mb-4'>
      <Search className='size-6 text-gray-400' />
      <input
        type='text'
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        placeholder='노래 검색'
        className='w-full h-auto bg-transparent outline-none text-gray-400'
      />
    </div>
  );
}
