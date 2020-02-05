import { ApolloError } from 'apollo-client';
import {
  ReserveDataFragment,
  useReserveUpdateSubscriptionSubscription,
  useUsdPriceEthSubscription,
} from '../graphql';

interface PoolReservesSubscription {
  loading: boolean;
  error?: ApolloError;
  data: {
    usdPriceEth: string;
    reserves: ReserveDataFragment[];
  };
}

export function usePoolReservesWithSubscription(): PoolReservesSubscription {
  const {
    loading: reservesLoading,
    data: reservesData,
    error: reservesError,
  } = useReserveUpdateSubscriptionSubscription();

  console.log("Data: ", reservesData)
  const {
    loading: usdPriceLoading,
    data: usdPriceData,
    error: usdPriceError,
  } = useUsdPriceEthSubscription();

  const reserves: ReserveDataFragment[] = reservesData
    ? reservesData.reserves.sort((a, b) => (a.symbol > b.symbol ? 1 : a.symbol < b.symbol ? -1 : 0))
    : [];
  const usdPriceEth =
    (usdPriceData && usdPriceData.priceOracle && usdPriceData.priceOracle.usdPriceEth) || '';
  return {
    error: reservesError || usdPriceError,
    loading: reservesLoading || usdPriceLoading,
    data: { reserves, usdPriceEth },
  };
}
