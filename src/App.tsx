import React, { useEffect } from "react";
import "./template/assets/css/animate.min.css";
import "./template/assets/css/ares.css";
import "./template/assets/css/bootstrap.min.css";
import $ from "jquery";
import gql from "graphql-tag";
import DepositsList from "./components/DepositsList";
import BorrowsList from "./components/BorrowsList";
import LiquidationsList from "./components/LiquidationsList";
import GlobalMarketData from "./components/GlobalMarketData";
import BorrowDepositVolume from "./components/BorrowDepositVolume";
import MostBorrowedAsset from "./components/MostBorrowedAsset";

const appear = require("jquery.appear");
const countTo = require("jquery-countto");
const easyPieChart = require("easy-pie-chart").easyPieChart;

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

            </div>
            <div className="col-sm-6 col-lg-3 col-lg-pull-6">
             <BorrowsList />
             <DepositsList />
             <LiquidationsList />
             
            </div>
            <div className="col-sm-6 col-lg-3">
              <BorrowDepositVolume />
              <MostBorrowedAsset />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
