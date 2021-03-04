import React from 'react';
import Org1 from '../../assests/images/org1.jpg';
import Org2 from '../../assests/images/org2.jpg';
import Org3 from '../../assests/images/org3.jpg';

const Organizer = () => {
  return (
    <div style={{ background: 'white' }}>
      <div className="organizer">
        <div className="organizer_header">
          <h2> Organizer </h2>
        </div>
        <div className="organizer_info">
          <div
            className="organizer_info_left"
            data-aos="zoom-in-down"
            data-aos-duration="600"
          >
            <div className="organizer_info_left_header">
              <h3>University of Dhaka</h3>
            </div>
            <div className="organizer_info_left_info">
              <p>
                The University of Dhaka is the oldest and largest university in
                Bangladesh that started its journey on 1st July 1921. This is
                one of the most distinguished institutions for higher education
                and research. The campus life of the University is full of
                opportunities and activities to complement the regular academic
                undertakings and various services and facilities.
              </p>
              <p>
                This year, the Department of Computer Science and Engineering,
                University of Dhaka, is organizing the ICPC Dhaka Regional,
                2020.
              </p>
            </div>
            <div className="organizer_info_left_see_more">
              <a
                href="https://www.du.ac.bd/"
                target="_blank"
                rel="noopener noreferrer"
                id="importantDatesId"
              >
                Learn more →
              </a>
            </div>
          </div>
          <div className="organizer_info_right">
            <img className="i1" src={Org2} alt="University Of Dhaka" />
            <img className="i2" src={Org3} alt="University Of Dhaka" />
            <img className="i3" src={Org1} alt="University Of Dhaka" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizer;
