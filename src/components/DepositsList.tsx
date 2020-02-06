import React from "react";
import ListBlockItem from "./ListBlockItem";
import ListBlock from "./ListBlock";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "react-loader-spinner";
import moment from "moment";
import NumberFormat from "react-number-format";
import BigNumber from "bignumber.js";

const depositsQuery = gql`
  {
    deposits(orderBy: timestamp, orderDirection: desc, first: 10) {
      id
      amount
      reserve {
        symbol
      }
      timestamp
    }
  }
`;

const DepositsList = () => {
  return (
    <ListBlock title="LAST DEPOSITS">
      <Query query={depositsQuery}>
        {({ loading, error, data }: any) => {
          if (loading) return <div style={{textAlign:"center"}}><Loader type="Audio" color="#FFFFFF"></Loader></div>;
          if (error) return <div>Error</div>;

          return data.deposits.map((item: any, index: number) => {

          const itemToRender = {
            date: moment.unix(item.timestamp).format("MM/DD/YYYY"),
            content: <NumberFormat displayType="text" type="text" thousandSeparator=" " value={new BigNumber(item.amount).toFixed(2)} suffix={" "+item.reserve.symbol}></NumberFormat>,
            logo: require(`../template/assets/img/${item.reserve.symbol.toLowerCase()}.svg`)
          }
            return <ListBlockItem item={itemToRender} index={index} />;
          });
        }}
      </Query>
    </ListBlock>
  );
};

export default DepositsList;
