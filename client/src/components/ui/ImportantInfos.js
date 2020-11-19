import React, {useEffect, useState} from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";

const ImportantInfos = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <div className='importantInfosWrappers'>
      <div className='important_infos'>
        <div className='flex_child' data-aos="zoom-in-up" data-aos-duration="1000">
          <div className='flex_child_header'>
            <p> Latest Information </p>
          </div>
          <div className='flex_child_list'>
            <a href='#'>Date and Venue</a>
            <a href='#'>Online Preliminary Registration</a>
            <a href='#'>Onsite Contest Registration</a>
            <a href='#'>Program Schedule</a>
            <a href='#'>Payment</a>
            <a href='#'>System Configuration</a>
            <a href="#">ICPC Regional Rules for 2016 </a>
            <a href='#'>Onsite Contest Registration</a>
            <a href='#'>Program Schedule</a>
            <a href='#'>Payment</a>
          </div>
        </div>
        <div className='flex_child' data-aos="zoom-in-up" data-aos-duration="1000">
          <div className='flex_child_header'>
            <p> Important Links  </p>
          </div>
          <div className='flex_child_list'>
            <a href='#'>ACM ICPC HQ</a>
            <a href='#'>ICPC Policy and Procedure</a>
            <a href='#'>ICPC Archive</a>
            <a href='#'>IBM Community</a>
            <a href='#'>Host University</a>
            <a href='#'>ACM-ICPC Blog by C J Hwang</a>
            <a href='#'>Visit Bangladesh 2016</a>
          </div>
        </div>
        <div className='flex_child' data-aos="zoom-in-up" data-aos-duration="1000">
          <div className='flex_child_header'>
            <p>Important Dates </p>
          </div>
          <div className='flex_child_list imp_dates'>
            <div className="each_imp_dates">
              <p>August 31, 2020</p>
              <p>OnSite Contest & Prize Giving Ceremony</p>
            </div>
            <div className="each_imp_dates">
              <p>August 31, 2020</p>
              <p>OnSite Contest & Prize Giving Ceremony</p>
            </div>
            <div className="each_imp_dates">
              <p>August 31, 2020</p>
              <p>OnSite Contest & Prize Giving Ceremony</p>
            </div>
            <div className="each_imp_dates">
              <p>August 31, 2020</p>
              <p>OnSite Contest & Prize Giving Ceremony</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportantInfos;
