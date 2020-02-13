import React from "react";
import ListBlockItem from "./ListBlockItem";
import Block from "./Block";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "react-loader-spinner";
import moment from "moment";
import NumberFormat from "react-number-format";
import BigNumber from "bignumber.js";

const liquidationCallsQuery = gql`
  {
    liquidationCalls(orderBy: timestamp, orderDirection: desc, first: 10) {
      principalAmount
      principalReserve {
        symbol
      }
      collateralAmount
      collateralReserve {
        symbol
      }
      timestamp
    }
  }
`;

const LiquidationsList = () => {
  return (
    <Block title="LAST LIQUIDATIONS">
      <Query query={liquidationCallsQuery}>
        {({ loading, error, data }: any) => {
          if (loading)
            return (
              <div style={{ textAlign: "center" }}>
                <Loader type="Oval" color="#FFFFFF" width={32}></Loader>
              </div>
            );
          if (error) return <div>Error</div>;

          return data.liquidationCalls.map((item: any, index: number) => {
            const itemToRender = {
              date: moment.unix(item.timestamp).format("MM/DD/YYYY"),
              content: (
                <>
                  <NumberFormat
                    displayType="text"
                    type="text"
                    thousandSeparator=" "
                    value={new BigNumber(item.principalAmount).toFixed(2)}
                    suffix={" " + item.principalReserve.symbol}
                  ></NumberFormat>
                  <span> &#8594; </span>
                  <NumberFormat
                    displayType="text"
                    type="text"
                    thousandSeparator=" "
                    value={new BigNumber(item.collateralAmount).toFixed(2)}
                    suffix={" " + item.collateralReserve.symbol}
                  ></NumberFormat>
                </>
              ),
              logo: require(`../template/assets/img/${item.principalReserve.symbol.toLowerCase()}.svg`)
            };
            return <ListBlockItem item={itemToRender} index={index} />;
          });
        }}
      </Query>
    </Block>
  );
};

export default LiquidationsList;
