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
                University of Dhaka is the oldest and largest university in
                Bangladesh and one of the oldest and most distinguished
                institutions for higher education and research. The campus life
                at Dhaka University is full of opportunities and activities to
                complement the regular academic undertakings along with various
                services and facilities.
              </p>
              <p>
                In this year,{' '}
                <b style={{ color: '#222' }}>
                  Department of Computer Science and Engineering, University of
                  Dhaka
                </b>{' '}
                is going to organize the ICPC Dhaka Regional, 2020! A big thanks
                to them for taking the challenge in these uncertain times.
              </p>
            </div>
            <div className="organizer_info_left_see_more">
              <a
                href="https://www.du.ac.bd/"
                target="_blank"
                rel="noopener noreferrer"
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
