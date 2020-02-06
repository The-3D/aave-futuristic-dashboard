
import React from 'react'


const BorrowVolume = () => {

   return  <div className="block">
    <div className="block-header overflow-hidden">
      <h2
        className="block-title visibility-hidden"
        data-toggle="appear"
        data-className="animated fadeInDown"
      >
        DAILY BORROW VOLUME
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
 
}


export default BorrowVolume