import React from "react";
import moment from "moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import BigNumber from "bignumber.js";
import NumberFormat from "react-number-format";
import { XYPlot, VerticalBarSeries, LabelSeries, FlexibleWidthXYPlot } from "react-vis";
import CountUp from "react-countup";

const currTimestamp = moment().unix();

const oneDayBeforeTimestamp = moment()
  .subtract(1, "days")
  .endOf("day")
  .unix();

const oneWeekBeforeTimestamp = moment()
  .subtract(7, "days")
  .endOf("day")
  .unix();

const borrowVolumeQuery = gql`
{

  reserves{
    borrowHistory(where:{timestamp_lte:${currTimestamp},timestamp_gte: ${oneWeekBeforeTimestamp}}){

      amount
      timestamp
    }

    depositHistory(where:{timestamp_lte:${currTimestamp},timestamp_gte: ${oneWeekBeforeTimestamp}}){

      amount
      timestamp
    }

    symbol
    
    price{
      priceInEth
    }
  }
  priceOracle(id: 1) {
    usdPriceEth
  }
}


`;

type BorrowDepositVolume = {
  borrowed: BigNumber,
  deposited: BigNumber
}

const calculateTotalBorrowDepositVolumeByTimeInterval = (
  data: any,
  startTimestamp: number,
  endTimestamp: number
): BorrowDepositVolume => {
  return data.reserves.reduce((total: BorrowDepositVolume, reserve: any) => {
    const deposited = reserve.depositHistory
      .filter(
        (deposit: any) =>
          new BigNumber(deposit.timestamp).gte(startTimestamp) &&
          new BigNumber(deposit.timestamp).lt(endTimestamp)
      )
      .reduce((accumulator: BigNumber, deposit: any) => {
        const ethUsdPrice = new BigNumber(data.priceOracle.usdPriceEth);
        const reserveEthPrice = new BigNumber(reserve.price.priceInEth);

        return accumulator.plus(
          reserveEthPrice.times(deposit.amount).div(ethUsdPrice)
        );
      }, new BigNumber(0));

    const borrowed = reserve.borrowHistory
      .filter(
        (borrow: any) =>
          new BigNumber(borrow.timestamp).gte(startTimestamp) &&
          new BigNumber(borrow.timestamp).lt(endTimestamp)
      )
      .reduce((accumulator: BigNumber, borrow: any) => {
        const ethUsdPrice = new BigNumber(data.priceOracle.usdPriceEth);
        const reserveEthPrice = new BigNumber(reserve.price.priceInEth);

        return accumulator.plus(
          reserveEthPrice.times(borrow.amount).div(ethUsdPrice)
        );
      }, new BigNumber(0));

    return {
      borrowed: total.borrowed.plus(borrowed),
      deposited: total.deposited.plus(deposited)
    }
  }, { borrowed: new BigNumber(0), deposited: new BigNumber(0) });
};

const BorrowDepositVolume = () => {
  return (
    <Query query={borrowVolumeQuery}>
      {({ loading, error, data }: any) => {
        let dataToday : BorrowDepositVolume = {borrowed: new BigNumber(0), deposited: new BigNumber(0)}
        let maxBorrow = new BigNumber(0);
        let maxDeposits = new BigNumber(0);
        let borrowSeries = [], depositsSeries = [];

        if (!loading && !error) {
          //todays borrow volume

          dataToday = calculateTotalBorrowDepositVolumeByTimeInterval(
            data,
            oneDayBeforeTimestamp,
            currTimestamp
          );

          let counter = 0;


          for (let i = oneWeekBeforeTimestamp; i < currTimestamp; i += 86400) {
            const {borrowed: borrowedOnDay, deposited: depositedOnDay} = calculateTotalBorrowDepositVolumeByTimeInterval(
              data,
              i,
              i + 86400
            )

            borrowSeries.push({
              x: counter,
              y: borrowedOnDay.toNumber(),
              label: `${borrowedOnDay.toFixed(0)}`,
              style: { textAnchor: "middle", fill: "white", fontWeight: "bold", fontSize: 10 }
            });

            depositsSeries.push({
              x: counter,
              y: depositedOnDay.toNumber(),
              label: `${depositedOnDay.toFixed(0)}`,
              style: { textAnchor: "middle", fill: "white", fontWeight: "bold", fontSize: 10 }
            });

            maxBorrow = borrowedOnDay.gt(maxBorrow) ? borrowedOnDay : maxBorrow
            maxDeposits = depositedOnDay.gt(maxDeposits) ? depositedOnDay : maxDeposits
            counter++;
          }
        }

        return (
          <>
            <div className="block">
              <div className="block-header overflow-hidden">
                <h2
                  className="block-title visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInDown"
                >
                  BORROW STATISTICS
                </h2>

                <h3
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                  className="block-title visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInDown"
                >
                  TODAYS BORROW VOLUME
                </h3>
                <h3
                  style={{
                    color: "white",
                    padding: "0",
                    margin: "0",
                    lineHeight: 0,
                    paddingBottom: 10
                  }}
                  className="block-title visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInDown"
                >
                  {<CountUp end={dataToday.borrowed.toNumber()} separator=" " suffix=" USD" />}
                </h3>
              </div>
              <div className="block-content overflow-hidden">
                <FlexibleWidthXYPlot height={200} yDomain={[0, maxBorrow.plus(maxBorrow.times(0.15)).toNumber()]}>
                  <VerticalBarSeries data={borrowSeries} />
                  <LabelSeries animation allowOffsetToBeReversed data={borrowSeries} />
                </FlexibleWidthXYPlot>
              </div>
            </div>
            <div className="block">
              <div className="block-header overflow-hidden">
                <h2
                  className="block-title visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInDown"
                >
                  DEPOSITS
                </h2>

                <h3
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "14px"
                  }}
                  className="block-title visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInDown"
                >
                  TODAYS ADDED COLLATERAL
                </h3>
                <h3
                  style={{
                    color: "white",
                    padding: "0",
                    margin: "0",
                    lineHeight: 0,
                    paddingBottom: 10
                  }}
                  className="block-title visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInDown"
                >
                  {<CountUp end={dataToday.deposited.toNumber()} separator=" " suffix=" USD" />}
                </h3>
              </div>
              <div className="block-content overflow-hidden">
                <FlexibleWidthXYPlot height={200} yDomain={[0, maxDeposits.plus(maxDeposits.times(0.15)).toNumber()]}>
                  <VerticalBarSeries data={depositsSeries} />
                  <LabelSeries animation allowOffsetToBeReversed data={depositsSeries} />
                </FlexibleWidthXYPlot>
              </div>
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default BorrowDepositVolume;
