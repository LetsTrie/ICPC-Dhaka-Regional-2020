import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const redirectFiles = (e, url) => {
  e.preventDefault();
  if (process.env.NODE_ENV === 'development') {
    window.open('http://localhost:5000' + url);
  } else {
    window.open(window.location.protocol + '//' + window.location.host + url);
  }
};

const ImportantInfos = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="importantInfosWrappers">
      <div className="important_infos">
        <div
          className="flex_child"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <div className="flex_child_header">
            <p> Latest Information </p>
          </div>
          <div className="flex_child_list">
            <a href="#">Date and Venue</a>
            <a href="https://icpc.global/">Online Preliminary Registration</a>
            {/* <a href="#">Onsite Contest Registration</a> */}
            <a
              onClick={(e) =>
                redirectFiles(
                  e,
                  '/informations-for-participants.pdf'
                )
              }
            >
              Contest Guideline
            </a>
            <a href="#">Program Schedule</a>
            {/* <a href="#">System Configuration</a> */}
            <a
              onClick={(e) =>
                redirectFiles(
                  e,
                  '/NavigationFiles/rules-of-icpc-dhaka-regional.pdf'
                )
              }
            >
              ICPC Regional Rules for 2020
            </a>
            {/* <a href="#">Onsite Contest Registration</a> */}
            <a href="/payment/teamid">Payment</a>
          </div>
        </div>
        <div
          className="flex_child"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <div className="flex_child_header">
            <p>Important Dates </p>
          </div>
          <div className="flex_child_list imp_dates">
            <div className="each_imp_dates">
              <p>February 22, 2021</p>
              <p>Registration Starts (Ends in 25/03/2021)</p>
            </div>
            <div className="each_imp_dates">
              <p>March 31, 2021</p>
              <p>Payment last Date (With Priliminary Fee)</p>
            </div>
            <div className="each_imp_dates">
              <p>April 10, 2021</p>
              <p>Preliminary Contest Date</p>
            </div>
            <div className="each_imp_dates">
              <p>May 20, 2021</p>
              <p>Payment last date for Final</p>
            </div>
            <div className="each_imp_dates">
              <p>May 29, 2021</p>
              <p>Final Contest Date</p>
            </div>
          </div>
        </div>

        <div
          className="flex_child"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <div className="flex_child_header">
            <p> Important Links </p>
          </div>
          <div className="flex_child_list">
            <a href="#">ACM ICPC HQ</a>
            <a href="#">ICPC Policy and Procedure</a>
            <a href="#">ICPC Archive</a>
            <a href="#">IBM Community</a>
            <a href="#">Host University</a>
            <a href="#">ACM-ICPC Blog by C J Hwang</a>
            <a href="#">Visit Bangladesh 2016</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantInfos;
