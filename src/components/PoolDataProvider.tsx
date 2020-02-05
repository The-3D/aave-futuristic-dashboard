import React, { ReactElement, ReactNode, useContext } from 'react';
import BigNumber from 'bignumber.js';
import { formatUserSummaryData, normalize, formatReserves } from '@aave/protocol-js';

import { ReserveDataFragment } from '../graphql';
import { usePoolReservesWithSubscription } from '../hooks/UsePoolReservesWithSubscriptions';
import { useCurrentTimestamp } from '../hooks/UseCurrentTimestamp';

export interface PoolDataContextData {
  reserves: ReserveDataFragment[];
  usdPriceEth: string;
}

const PoolDataContext = React.createContext({} as PoolDataContextData);

interface PoolDataProviderProps {
  children: ReactNode;
  loader: ReactElement;
  errorPage: ReactElement;
}

export function PoolDataProvider({ children, loader, errorPage }: PoolDataProviderProps) {
  const {
    loading: reservesLoading,
    data: poolReserves,
    error: reservesError,
  } = usePoolReservesWithSubscription();


  const currentTimestamp = useCurrentTimestamp(1);

  console.log(reservesError, reservesLoading, poolReserves)
  if (reservesLoading) {
    return loader;
  }

  if (
    reservesError ||
    !poolReserves.reserves.length ||
    !currentTimestamp
  ) {
    return errorPage;
  }
  poolReserves.reserves = poolReserves.reserves.map(reserve => ({
    ...reserve,
    symbol: reserve.symbol.toUpperCase(),
  }));

  
  const formattedPoolReserves = formatReserves(poolReserves.reserves);
  console.log('formattedPoolReserves', formattedPoolReserves);

  return (
    <PoolDataContext.Provider
      value={{
        usdPriceEth: normalize(poolReserves.usdPriceEth, 18),
        reserves: formattedPoolReserves,
      }}
    >
      {children}
    </PoolDataContext.Provider>
  );
}

export const usePoolDataContext = () => useContext(PoolDataContext);
