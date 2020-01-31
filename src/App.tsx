import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./template/assets/css/animate.min.css";
import "./template/assets/css/ares.css";
import "./template/assets/css/bootstrap.min.css";
import $ from "jquery";

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

    $('[data-toggle="countTo"]').each(function() {
      var el: any = $(this);
      var after = el.data("after");
      var before = el.data("before");
      var speed = el.data("speed") ? el.data("speed") : 1500;
      var interval = el.data("interval") ? el.data("interval") : 15;

      el.appear(function() {
        el.countTo({
          speed: speed,
          refreshInterval: interval,
          onComplete: function() {
            if (after) {
              el.html(el.html() + after);
            } else if (before) {
              el.html(before + el.html());
            }
          }
        });
      });
    });

  });
  return (
    <div className="App">
      <div id="page-container" className="modern-sf">
        <header id="page-header">
          <div className="h3 text-right pull-right hidden-xs">
            <div className="text-crystal font-w300">USER_LOGGED_IN</div>
            <div className="text-success animated infinite pulse pull-right">
              [LIVE]
            </div>
          </div>
          <h1 className="h3 font-w200">
            <span className="text-crystal">//</span>{" "}
            <a className="link-sf font-w300" href="index.html">
              ARES_DASHBOARD
            </a>
          </h1>
        </header>
        <main id="page-main">
          <div className="row">
            <div className="col-lg-6 col-lg-push-3 overflow-hidden push-20">
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
                  data-timeout="100"
                >
                  <span className="circle circle-1"></span>
                </div>
                <div
                  className="visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeIn"
                  data-timeout="200"
                >
                  <span className="circle circle-2"></span>
                </div>
                <div
                  className="visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeIn"
                  data-timeout="300"
                >
                  <span className="circle circle-3"></span>
                </div>
                <div
                  className="visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeIn"
                  data-timeout="400"
                >
                  <span className="circle circle-4"></span>
                </div>
                <div
                  className="visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeIn"
                  data-timeout="500"
                >
                  <span className="circle circle-5"></span>
                </div>
                <div
                  className="visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeIn"
                  data-timeout="600"
                >
                  <span className="circle circle-6"></span>
                </div>
                <div
                  className="visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeIn"
                  data-timeout="800"
                >
                  <span className="circle circle-over-1 hidden-xs">
                    <span
                      data-toggle="countTo"
                      data-to="798"
                      data-speed="100000"
                    ></span>
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
                  <span
                    data-toggle="countTo"
                    data-to="16540"
                    data-speed="60000"
                  ></span>
                  <br />
                  <span className="text-crystal">USD</span>
                </span>
              </div>
              <div className="row">
                <div
                  className="col-xs-6 visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInLeft"
                  data-timeout="100"
                >
                  <button className="btn btn-xl btn-block btn-sf push-10">
                    DATA_DRIVE
                  </button>
                </div>
                <div
                  className="col-xs-6 visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInRight"
                  data-timeout="100"
                >
                  <button className="btn btn-xl btn-block btn-sf push-10">
                    PO_DATABASE
                  </button>
                </div>
                <div
                  className="col-xs-6 visibility-hidden"
                  data-toggle="appear"
                  data-className="animated fadeInLeft"
                  data-timeout="500"
                >
                  <button className="btn btn-xl btn-block btn-sf">
                    ACTIVE_ROUTE
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
            </div>
            <div className="col-sm-6 col-lg-3 col-lg-pull-6">
              <div className="block">
                <div className="block-header overflow-hidden">
                  <h2
                    className="block-title visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInDown"
                  >
                    Environment
                  </h2>
                </div>
                <div className="block-content">
                  <div className="row items-push overflow-hidden">
                    <div
                      className="col-xs-4 text-center visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInLeft"
                      data-timeout="100"
                    >
                      <div
                        className="js-pie-chart pie-chart"
                        data-percent="50"
                        data-line-width="5"
                        data-size="65"
                        data-bar-color="rgba(255, 255, 255, .2)"
                        data-track-color="rgba(255, 255, 255, .1)"
                      >
                        <span className="font-s16 font-w600">PSI</span>
                      </div>
                    </div>
                    <div
                      className="col-xs-8 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInRight"
                      data-timeout="400"
                    >
                      <div className="text-uppercase font-w600 text-white-op">
                        Pressure
                      </div>
                      <div className="font-s36 font-w300">15.65</div>
                    </div>
                  </div>
                  <div className="row items-push overflow-hidden">
                    <div
                      className="col-xs-4 text-center visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInLeft"
                      data-timeout="200"
                    >
                      <div
                        className="js-pie-chart pie-chart"
                        data-percent="29"
                        data-line-width="5"
                        data-size="65"
                        data-bar-color="rgba(255, 255, 255, .2)"
                        data-track-color="rgba(255, 255, 255, .1)"
                      >
                        <span className="font-s16 font-w600">%</span>
                      </div>
                    </div>
                    <div
                      className="col-xs-8 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInRight"
                      data-timeout="500"
                    >
                      <div className="text-uppercase font-w600 text-white-op">
                        Oxygen
                      </div>
                      <div className="font-s36 font-w300">29.15</div>
                    </div>
                  </div>
                  <div className="row items-push overflow-hidden">
                    <div
                      className="col-xs-4 text-center visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInLeft"
                      data-timeout="300"
                    >
                      <div
                        className="js-pie-chart pie-chart"
                        data-percent="60"
                        data-line-width="5"
                        data-size="65"
                        data-bar-color="rgba(255, 255, 255, .2)"
                        data-track-color="rgba(255, 255, 255, .1)"
                      >
                        <span className="font-s16 font-w600">C&deg;</span>
                      </div>
                    </div>
                    <div
                      className="col-xs-8 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInRight"
                      data-timeout="600"
                    >
                      <div className="text-uppercase font-w600 text-white-op">
                        Temperature
                      </div>
                      <div className="font-s36 font-w300">5.3</div>
                    </div>
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
                    Planets
                  </h2>
                </div>
                <div className="block-content">
                  <div className="row items-push overflow-hidden">
                    <div
                      className="col-xs-4 text-center visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInLeft"
                      data-timeout="100"
                    >
                      <div
                        className="js-pie-chart pie-chart"
                        data-percent="100"
                        data-line-width="20"
                        data-size="45"
                        data-bar-color="rgba(255, 255, 255, .2)"
                        data-track-color="#c07635"
                      >
                        <span className="font-s16 font-w600"></span>
                      </div>
                    </div>
                    <div
                      className="col-xs-8 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInRight"
                      data-timeout="400"
                    >
                      <div className="text-uppercase font-w600 text-white-op">
                        Mars
                      </div>
                      <div className="font-s36 font-w300">
                        1.67{" "}
                        <span className="font-s16 font-w400 text-crystal">
                          L.Y.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row items-push overflow-hidden">
                    <div
                      className="col-xs-4 text-center visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInLeft"
                      data-timeout="200"
                    >
                      <div
                        className="js-pie-chart pie-chart"
                        data-percent="100"
                        data-line-width="22"
                        data-size="50"
                        data-bar-color="rgba(255, 255, 255, .2)"
                        data-track-color="#3673cc"
                      >
                        <span className="font-s16 font-w600"></span>
                      </div>
                    </div>
                    <div
                      className="col-xs-8 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInRight"
                      data-timeout="500"
                    >
                      <div className="text-uppercase font-w600 text-white-op">
                        Earth
                      </div>
                      <div className="font-s36 font-w300">
                        1.62{" "}
                        <span className="font-s16 font-w400 text-crystal">
                          L.Y.
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row items-push overflow-hidden">
                    <div
                      className="col-xs-4 text-center visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInLeft"
                      data-timeout="300"
                    >
                      <div
                        className="js-pie-chart pie-chart"
                        data-percent="100"
                        data-line-width="30"
                        data-size="70"
                        data-bar-color="rgba(255, 255, 255, .2)"
                        data-track-color="#f7c880"
                      >
                        <span className="font-s16 font-w600"></span>
                      </div>
                    </div>
                    <div
                      className="col-xs-8 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeInRight"
                      data-timeout="600"
                    >
                      <div className="text-uppercase font-w600 text-white-op">
                        Saturn
                      </div>
                      <div className="font-s36 font-w300">
                        2.22{" "}
                        <span className="font-s16 font-w400 text-crystal">
                          L.Y.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="block">
                <div className="block-header overflow-hidden">
                  <h2
                    className="block-title visibility-hidden"
                    data-toggle="appear"
                    data-className="animated fadeInDown"
                  >
                    HQ_COMS
                  </h2>
                </div>
                <div className="block-content overflow-hidden">
                  <div className="row items-push">
                    <div
                      className="col-xs-6 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="300"
                    >
                      <div className="font-s24 font-w300 text-white-op">
                        C1 [<span className="text-success">40</span>]
                      </div>
                    </div>
                    <div
                      className="col-xs-6 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="500"
                    >
                      <div className="font-s24 font-w300 text-white-op">
                        C2 [<span className="text-success">60</span>]
                      </div>
                    </div>
                    <div
                      className="col-xs-6 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="700"
                    >
                      <div className="font-s24 font-w300 text-white-op">
                        C3 [<span className="text-success">80</span>]
                      </div>
                    </div>
                    <div
                      className="col-xs-6 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="900"
                    >
                      <div className="font-s24 font-w300 text-white-op">
                        C4 [<span className="text-success">90</span>]
                      </div>
                    </div>
                    <div
                      className="col-xs-6 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="1100"
                    >
                      <div className="font-s24 font-w300 text-white-op">
                        C5 [<span className="text-success">20</span>]
                      </div>
                    </div>
                    <div
                      className="col-xs-6 visibility-hidden"
                      data-toggle="appear"
                      data-className="animated fadeIn"
                      data-timeout="1300"
                    >
                      <div className="font-s24 font-w300 text-white-op">
                        C6 [<span className="text-success">30</span>]
                      </div>
                    </div>
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
          <div className="block">
            <div
              className="block-content block-content-full font-s12 text-center visibility-hidden"
              data-toggle="appear"
              data-className="animated fadeIn"
              data-timeout="1000"
            >
              2016 &copy; Crafted with{" "}
              <span className="text-danger">&hearts;</span> by{" "}
              <a className="link-sf" href="https://pixelcave.com/">
                pixelcave
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
