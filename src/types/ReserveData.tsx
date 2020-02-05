import {UserReserveDataFragment} from "../graphql"

export interface ComputedUserReserveModel extends UserReserveDataFragment {
    currentUnderlyingBalance: string;
    currentUnderlyingBalanceETH: string;
    currentUnderlyingBalanceUSD: string;
  
    currentBorrows: string;
    currentBorrowsETH: string;
    currentBorrowsUSD: string;
  
    principalBorrowsETH: string;
    principalBorrowsUSD: string;
  
    originationFeeETH: string;
    originationFeeUSD: string;
  }