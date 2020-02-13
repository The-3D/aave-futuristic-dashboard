import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Loader from "react-loader-spinner";
import Block from "./Block";
import CountUp from "react-countup";

//note: this query is an oversimplification, as it should consider the currency price and the total USD value.
//since the most borrowed are usually stablecoins, it will work anyway

const mostBorrowedQuery = gql`
  {
    reserves(orderBy: totalBorrows, orderDirection: desc) {
      symbol
      name
      totalBorrows
    }
  }
`;
const MostBorrowedAsset = () => {
  return (
    <Block title="MOST BORROWED ASSET">
      <Query query={mostBorrowedQuery}>
        {({ loading, error, data }: any) => {
          if (loading)
            return (
              <div style={{ textAlign: "center" }}>
                <Loader type="Oval" color="#FFFFFF" width={32}></Loader>
              </div>
            );
          if (error) return <div>Error</div>;
          return (
            <div
              className="font-w600 text-white-op push-5"
              data-toggle="appear"
              data-className="animated fadeInRight"
              data-timeout="100"
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <img
                    width="100"
                    src={require(`../template/assets/img/${data.reserves[0].symbol.toLowerCase()}.svg`)}
                  />
                </div>
                <div style={{ marginLeft: 20 }}>
                  <h2 style={{ fontWeight: "bold",marginTop:10 }}>
                    {data.reserves[0].name.toUpperCase()}
                  </h2>
                  <h3>
                    <CountUp
                      end={data.reserves[0].totalBorrows}
                      suffix=" USD"
                      separator=" "
                    ></CountUp>
                  </h3>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </Block>
  );
};

export default MostBorrowedAsset;
