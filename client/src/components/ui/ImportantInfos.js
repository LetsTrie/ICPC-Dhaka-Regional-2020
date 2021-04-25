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
    <div className="importantInfosWrappers" id="">
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
            <ul>
              <li>
                List of Selected Teams for ICPC Regional 2020 Has Been Published
              </li>
            </ul>
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
              <p>Registration starts</p>
              <p>March 05, 2021</p>
            </div>
            <div className="each_imp_dates">
              <p>Registration ends</p>
              <p>March 27, 2021</p>
            </div>
            <div className="each_imp_dates">
              <p>Preliminary fee collection end date</p>
              <p>March 31, 2021</p>
            </div>
            <div className="each_imp_dates">
              <p>Preliminary contest date</p>
              <p>April 07, 2021</p>
            </div>
            <div className="each_imp_dates">
              <p>Final contest date</p>
              <p>May 29, 2021</p>
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
            <a href="https://icpc.global/">ICPC HQ</a>
            <a href="https://icpc.global/auth/realms/cm5/protocol/openid-connect/registrations?client_id=cm5-frontend&redirect_uri=https%3A%2F%2Ficpc.global%2Fprivate&state=8ecb856b-1a4a-4a80-a84a-8618b21e5209&response_mode=fragment&response_type=code&scope=openid&nonce=f54beb72-c3ef-4822-864b-c52ecfbb7e92">
              ICPC Registration
            </a>
            <a href="https://du.ac.bd/">Host University</a>
            <a href="http://www.cse.du.ac.bd/">Dept. of CSE, DU</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantInfos;
