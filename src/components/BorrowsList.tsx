import React from "react";
import ListBlockItem from "./ListBlockItem";
import ListBlock from "./ListBlock";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "react-loader-spinner";
import moment from "moment";
import NumberFormat from 'react-number-format'
import BigNumber from "bignumber.js";


const borrowsQuery = gql`
  {
    borrows(orderBy: timestamp, orderDirection: desc, first: 10) {
      id
      amount
      reserve {
        symbol
      }
      timestamp
      borrowRate
      borrowRateMode
    }
  }
`;

const BorrowsList = () => {
  return (
    <ListBlock title="LAST BORROWS">
      <Query query={borrowsQuery}>
        {({ loading, error, data }: any) => {
          if (loading)
            return (
              <div style={{ textAlign: "center" }}>
                <Loader type="Audio" color="#FFFFFF" width={32}></Loader>
              </div>
            );
          if (error) return <div>Error</div>;

          return data.borrows.map((item: any, index: number) => {

            const itemToRender = {
              date: moment.unix(item.timestamp).format("MM/DD/YYYY"),
              content: <NumberFormat displayType="text" type="text" thousandSeparator=" " value={new BigNumber(item.amount).toFixed(2)} suffix={" "+item.reserve.symbol}></NumberFormat> ,
              logo: require(`../template/assets/img/${item.reserve.symbol.toLowerCase()}.svg`)
            }
            return (
              <ListBlockItem
                item={itemToRender}
                index={index}
                key={index}
              />
            );
          });
        }}
      </Query>
    </ListBlock>
  );
};

export default BorrowsList;
