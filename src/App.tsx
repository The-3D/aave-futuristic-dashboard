import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./template/assets/css/animate.min.css";
import "./template/assets/css/ares.css";
import "./template/assets/css/bootstrap.min.css";
import $ from "jquery";
import CountUp from "react-countup";
import ListBlock from "./components/ListBlock";
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import BigNumber from "bignumber.js";
import moment from "moment";
import DepositsList from "./components/DepositsList";
import BorrowsList from "./components/BorrowsList";
import LiquidationsList from "./components/LiquidationsList";
import GlobalMarketData from "./components/GlobalMarketData";
import BorrowVolume from "./components/BorrowDepositVolume";

const appear = require("jquery.appear");
const countTo = require("jquery-countto");
const easyPieChart = require("easy-pie-chart").easyPieChart;

type QueryProps = {
  loading: boolean;
  error: string;
  data: any;
};

const borrowsQuery = gql`
  {
    borrows(orderBy: timestamp, orderDirection: desc, first: 10) {
      id
      amount
      reserve {
        symbol
      }
      borrowRate
      borrowRateMode
      timestamp
    }
  }
`;

const App = () => {
  useEffect(() => {
    var lHtml = $("html");

    $('[data-toggle="appear"]').each(function() {
      var windowW =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      var el: any = $(this);
      var elClass = el.data("class") ? el.data("class") : "animated fadeIn";
      var offset = el.data("offset") ? el.data("offset") : 0;
      var timeout =
        lHtml.hasClass("ie9") || windowW < 992
          ? 0
          : el.data("timeout")
          ? el.data("timeout")
          : 0;

      el.appear(
        function() {
          setTimeout(function() {
            el.removeClass("visibility-hidden").addClass(elClass);
          }, timeout);
        },
        { accY: offset }
      );
    });
  });
  return (
    <div className="App">
      <div id="page-container" className="modern-sf">
        <header id="page-header">
          <div className="h1 text-right pull-right hidden-xs">
            <div className="text-success animated infinite pulse pull-right">
              [LIVE]
            </div>
          </div>
          <h1 className="h3 font-w200">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <div
                  style={{ marginTop: 12, marginLeft: 5 }}
                  className="text-crystal font-w300"
                >
                  DASHBOARD
                </div>
              </div>
            </div>
          </h1>
        </header>
        <main id="page-main">
          <div className="row">
            <div className="col-lg-6 col-lg-push-3 overflow-hidden push-20">
              <div className="row">
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                  <a
                    className="link-sf font-w300"
                    href="https://aave.com"
                    target="_blank"
                  >
                    <img
                      src={require("./template/assets/img/aaveLogo.svg")}
                      width={220}
                    />
                  </a>
                  <div
                    style={{ marginTop: 14, marginLeft: 5 }}
                    className="text-crystal font-w300"
                  >
                    DEPOSIT. EARN. CONTROL. INNOVATE.
                  </div>
                </div>
              </div>
              <GlobalMarketData />
              {/*
            <div className="row">
            <div
              className="col-xs-6 visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeInLeft"
              data-timeout="100"
            >
              <button className="btn btn-xl btn-block btn-sf push-10">
                MOST LIQUID STABLECOIN
              </button>
            </div>
            <div
              className="col-xs-6 visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeInRight"
              data-timeout="100"
            >
              <button className="btn btn-xl btn-block btn-sf push-10">
                MOST LIQUID TOKEN
              </button>
            </div>
            <div
              className="col-xs-6 visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeInLeft"
              data-timeout="500"
            >
              <button className="btn btn-xl btn-block btn-sf">

              </button>
            </div>
            <div
              className="col-xs-6 visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeInRight"
              data-timeout="500"
            >
              <button className="btn btn-xl btn-block btn-sf">
                AUTO_PILOT
              </button>
            </div>
          </div>
        

*/}
            </div>
            <div className="col-sm-6 col-lg-3 col-lg-pull-6">
             <BorrowsList />
             <DepositsList />
             <LiquidationsList />
             
            </div>
            <div className="col-sm-6 col-lg-3">
              <BorrowVolume />
               <div className="block">
                <div className="block-header overflow-hidden">
                  <h2
                    className="block-title visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInDown"
                  >
                    POS_TRACKING
                  </h2>
                </div>
                <div className="block-content block-content-full overflow-hidden">
                  <div
                    className="font-w600 text-white-op push-5 visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInRight"
                    data-timeout="100"
                  >
                    X: 95
                  </div>
                  <div
                    className="progress visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInLeft"
                    data-timeout="100"
                  >
                    <div
                      className="progress-bar progress-bar-sf progress-bar-striped active"
                      role="progressbar"
                      aria-valuenow={95}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                  <div
                    className="font-w600 text-white-op push-5 visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInRight"
                    data-timeout="300"
                  >
                    Y: 49
                  </div>
                  <div
                    className="progress visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInLeft"
                    data-timeout="300"
                  >
                    <div
                      className="progress-bar progress-bar-sf progress-bar-striped active"
                      role="progressbar"
                      aria-valuenow={49}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "49%" }}
                    ></div>
                  </div>
                  <div
                    className="font-w600 text-white-op push-5 visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInRight"
                    data-timeout="500"
                  >
                    Z: 59
                  </div>
                  <div
                    className="progress visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInLeft"
                    data-timeout="500"
                  >
                    <div
                      className="progress-bar progress-bar-sf progress-bar-striped active"
                      role="progressbar"
                      aria-valuenow={59}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "59%" }}
                    ></div>
                  </div>
                  <div
                    className="font-w600 text-white-op push-5 visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInRight"
                    data-timeout="700"
                  >
                    V: +60
                  </div>
                  <div
                    className="progress visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInLeft"
                    data-timeout="700"
                  >
                    <div
                      className="progress-bar progress-bar-sf progress-bar-striped active"
                      role="progressbar"
                      aria-valuenow={60}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="block-header overflow-hidden">
                  <h2
                    className="block-title visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInDown"
                  >
                    DATA_STREAM
                  </h2>
                </div>
                <div className="block-content">
                  <div className="row items-push">
                    <div
                      className="col-xs-4 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="100"
                    >
                      <div className="font-s12 text-white-op">AT1</div>
                      <div
                        className="font-s18 text-success"
                        data-toggle="countTo"
                        data-to="148"
                        data-speed="4000"
                      ></div>
                    </div>
                    <div
                      className="col-xs-4 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="300"
                    >
                      <div className="font-s12 text-white-op">SR1</div>
                      <div
                        className="font-s18 text-success"
                        data-toggle="countTo"
                        data-to="30"
                        data-speed="4000"
                      ></div>
                    </div>
                    <div
                      className="col-xs-4 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="500"
                    >
                      <div className="font-s12 text-white-op">AF1</div>
                      <div
                        className="font-s18 text-success"
                        data-toggle="countTo"
                        data-to="123"
                        data-speed="4000"
                      ></div>
                    </div>
                    <div
                      className="col-xs-4 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="700"
                    >
                      <div className="font-s12 text-white-op">AT2</div>
                      <div
                        className="font-s18 text-success"
                        data-toggle="countTo"
                        data-to="180"
                        data-speed="4000"
                      ></div>
                    </div>
                    <div
                      className="col-xs-4 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="900"
                    >
                      <div className="font-s12 text-white-op">SR2</div>
                      <div
                        className="font-s18 text-success"
                        data-toggle="countTo"
                        data-to="680"
                        data-speed="4000"
                      ></div>
                    </div>
                    <div
                      className="col-xs-4 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="1100"
                    >
                      <div className="font-s12 text-white-op">AF2</div>
                      <div
                        className="font-s18 text-success"
                        data-toggle="countTo"
                        data-to="15"
                        data-speed="4000"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
