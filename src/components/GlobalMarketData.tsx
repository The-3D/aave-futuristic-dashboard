import React, { useEffect } from "react";
import CountUp from "react-countup";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "react-loader-spinner";
import BigNumber from "bignumber.js";
import $ from "jquery";
const marketData = gql`
  {
    reserves {
      totalLiquidity
      availableLiquidity
      totalBorrows
      symbol
      price {
        priceInEth
      }
    }
    priceOracle(id: 1) {
      usdPriceEth
    }
  }
`;

const GlobalMarketData = () => {
  return (
    <Query query={marketData}>
      {({ loading, error, data }: any) => {
        let dataToRender: any = null;

        if (error) {
          console.log(error)
          return null;
        }
        if (!loading) {
          const ethUsdPrice = data.priceOracle.usdPriceEth;

          dataToRender = data.reserves.reduce(
            (accumulator: any, value: any) => {
              const { priceInEth } = value.price;

              const totalETH = new BigNumber(value.totalLiquidity).times(
                priceInEth
              );

              const availableETH = new BigNumber(
                value.availableLiquidity
              ).times(priceInEth);

              const borrowedETH = new BigNumber(value.totalBorrows).times(
                priceInEth
              );

              return {
                marketSize: totalETH
                  .div(ethUsdPrice)
                  .plus(accumulator.marketSize)
                  .toFixed(0),
                totalLocked: availableETH
                  .div(ethUsdPrice)
                  .plus(accumulator.totalLocked)
                  .toFixed(0),
                totalBorrowed: borrowedETH
                  .div(ethUsdPrice)
                  .plus(accumulator.totalBorrowed)
                  .toFixed(0)
              };
            },
            { marketSize: "0", totalBorrowed: "0", totalLocked: "0" }
          );
        }

        return (
          <div className="circles push-50">
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
            >
              <span className="circle circle-0"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="300"
            >
              <span className="circle circle-1"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="500"
            >
              <span className="circle circle-2"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="700"
            >
              <span className="circle circle-3"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="800"
            >
              <span className="circle circle-4"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="1000"
            >
              <span className="circle circle-5"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="1100"
            >
              <span className="circle circle-6"></span>
            </div>
            <div
              className="visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="1200"
            >
              <span className="circle circle-over-1 hidden-xs">
                <CountUp end={445} separator=" "></CountUp>
              </span>
              <span className="circle circle-over-2 hidden-xs"></span>
              <span className="circle circle-over-3 hidden-xs"></span>
            </div>
            <span
              className="circle circles-main-content visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="100"
            >
              {dataToRender && (
                <>
                  <span className="circles-content-market-size-title">
                    MARKET SIZE
                  </span>
                  <br />
                  <CountUp
                    end={dataToRender.marketSize}
                    separator=" "
                    className="circles-content-market-size"
                  ></CountUp>
                  <span
                    style={{ fontSize: 36, marginLeft: 5 }}
                    className="text-crystal"
                  >
                    USD
                  </span>
                  <br />
                  <br />
                  <span style={{ fontWeight: "lighter", fontSize: 12 }}>
                    TOTAL VALUE LOCKED
                  </span>
                  <br />
                  <CountUp
                    end={dataToRender.totalLocked}
                    separator=" "
                    className="circles-content-other"
                  ></CountUp>
                  <span
                    style={{ fontSize: 24, marginLeft: 5 }}
                    className="text-crystal"
                  >
                    USD
                  </span>
                  <br />
                  <br />
                  <br />

                  <span style={{ fontWeight: "lighter", fontSize: 12 }}>
                    TOTAL BORROWED
                  </span>
                  <br />
                  <CountUp
                    end={dataToRender.totalBorrowed}
                    separator=" "
                    className="circles-content-other"
                  ></CountUp>
                  <span
                    style={{ fontSize: 24, marginLeft: 5 }}
                    className="text-crystal"
                  >
                    USD
                  </span>
                </>
              )}
            </span>
          </div>
        );
      }}
    </Query>
  );
};

export default GlobalMarketData;
