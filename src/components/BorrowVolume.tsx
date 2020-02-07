import React from "react";
import moment from "moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import BigNumber from "bignumber.js";
import NumberFormat from "react-number-format";
import { XYPlot, VerticalBarSeries, LabelSeries } from "react-vis";
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

const calculateTotalBorrowVolumeByTimeInterval = (
  data: any,
  startTimestamp: number,
  endTimestamp: number
) : BigNumber => {
  return data.reserves.reduce((total: BigNumber, reserve: any) => {
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

    return total.plus(borrowed);
  }, new BigNumber(0));
};

const BorrowVolume = () => {
  return (
    <Query query={borrowVolumeQuery}>
      {({ loading, error, data }: any) => {
        let borrowedToday = new BigNumber(0);
        let maxBorrow = new BigNumber(0);
        let borrowSeries = [];

        if (!loading && !error) {
          //todays borrow volume

          borrowedToday = calculateTotalBorrowVolumeByTimeInterval(
            data,
            oneDayBeforeTimestamp,
            currTimestamp
          );


          let counter = 0;
          

          for (let i = oneWeekBeforeTimestamp; i < currTimestamp; i += 86400) {
            const borrowedOnDay = calculateTotalBorrowVolumeByTimeInterval(
              data,
              i,
              i + 86400
            );
            borrowSeries.push({
              x: counter,
              y: borrowedOnDay.toNumber(),
              label: `${borrowedOnDay.toNumber()} USD`
            });

            maxBorrow = borrowedOnDay.gt(maxBorrow) ? borrowedOnDay : maxBorrow
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
                  {<CountUp end={borrowedToday.toNumber()} separator=" " suffix=" USD" />}
                </h3>
              </div>
              <div className="block-content overflow-hidden">
                <XYPlot height={200} width={400} yDomain={[0,maxBorrow.plus(maxBorrow.times(0.1)).toNumber()]}>
                  <VerticalBarSeries data={borrowSeries} />
                  <LabelSeries animation allowOffsetToBeReversed data={borrowSeries} />
                </XYPlot>
              </div>
            </div>
          </>
        );
      }}
    </Query>
  );
};

export default BorrowVolume;
