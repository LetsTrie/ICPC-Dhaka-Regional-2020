import React from 'react';
import JetBrain from '../../assests/images/jetbrains.png';
import ACM from '../../assests/images/acm.png';
import AcmICPC from '../../assests/images/acm-icpc.png';
import ICPC_Foundation from '../../assests/images/ICPC-Foundation.png';

function Sponsors() {
  return (
    <div>
      <section className='sponsor'>
        <div className='sponsor__heading'>
          <h2> Our Sponsors </h2>
        </div>
        <div className='sponsors'>
          <div className='sponsor_img'>
            <img src={JetBrain} alt='sponsor' />
          </div>
          <div className='sponsor_img'>
            <img src={ACM} alt='sponsor' />
          </div>
          <div className='sponsor_img'>
            <img src={AcmICPC} alt='sponsor' />
          </div>
          <div className='sponsor_img'>
            <img src={ICPC_Foundation} alt='sponsor' />
          </div>

          <div className='sponsor_img'>
            <img src={JetBrain} alt='sponsor' />
          </div>
          <div className='sponsor_img'>
            <img src={ACM} alt='sponsor' />
          </div>
          <div className='sponsor_img'>
            <img src={AcmICPC} alt='sponsor' />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sponsors;
