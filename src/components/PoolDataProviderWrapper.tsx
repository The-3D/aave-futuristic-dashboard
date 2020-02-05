import React, { ReactNode } from 'react';
import { PoolDataProvider } from '../components/PoolDataProvider';


interface PoolDataProviderWrapperProps {
  children: ReactNode;
}

export default function PoolDataProviderWrapper({ children }: PoolDataProviderWrapperProps) {
  return (
    <PoolDataProvider
      loader={<span>loading</span>}
      errorPage={
          <span>There was an error fetching the data.</span>
      }
    >
      {children}
    </PoolDataProvider>
  );
}
