import type { PropsWithChildren } from 'react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { TanstackQueryProvider } from './tanstack-query';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <TanstackQueryProvider>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </TanstackQueryProvider>
  );
};

export { Providers };
