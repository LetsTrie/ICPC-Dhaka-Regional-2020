import React from 'react';
import JetBrain from '../../assests/images/jetbrains.png';
import ACM from '../../assests/images/acm.png';
import AcmICPC from '../../assests/images/acm-icpc.png';
import ICPC_Foundation from '../../assests/images/ICPC-Foundation.png';
import BCC from '../../assests/images/BCC_logo.png';
import BDGOV from '../../assests/images/Bangladesh_government_logo.jpeg';
import ICT from '../../assests/images/ICT_Division_Logo.png';

function Sponsors() {
  return (
    <div>
      <section
        className="sponsor"
        data-aos="zoom-in-down"
        data-aos-duration="1000"
      >
        <div className="sponsor__heading">
          <h2> Our Sponsors </h2>
        </div>
        <div className="sponsors">
          <div className="sponsor_img">
            <img src={ICPC_Foundation} alt="sponsor" />
          </div>
          <div className="sponsor_img">
            <img src={BCC} alt="BCC logo" />
          </div>
          <div className="sponsor_img">
            <img src={BDGOV} alt="Bangladesh government logo" />
          </div>
          <div className="sponsor_img">
            <img src={ICT} alt="ICT Division Logo" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sponsors;
