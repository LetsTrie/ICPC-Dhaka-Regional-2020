import React, { Fragment } from 'react';
import '../../assests/css/footer.css';

const Footer = () => {
  return (
    <Fragment>
      <div className='footerr_wrapper'>
        <div className='footerr'>
          <div className='footer_flex_child'>
            <div className='flex_child_header'>
              <p>FOLLOW US</p>
            </div>
            <div className='flex_child_info'>
              <div className='fourIcons'>
                <a
                  href='http://google.com/'
                  className='fa fa-facebook'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {null}
                </a>
                <a
                  href='http://google.com/'
                  className='fa fa-youtube'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {null}
                </a>
                <a
                  href='http://google.com/'
                  className='fa fa-instagram'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {null}
                </a>
                <a
                  href='http://google.com/'
                  className='fa fa-twitter'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {null}
                </a>
              </div>
            </div>

            <div className='flex_child_header pt-5'>
              <p>NEWSLETTER</p>
            </div>
            <div className='flex_child_info'>
              <div className='inputBox'>
                <input type='text' placeholder='Email address' />
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>

          <div className='footer_flex_child'>
            <div className='flex_child_header'>
              <p>OUR LOCATION</p>
            </div>
            <div className='flex_child_info pt-2'>
              <div className='google_map_location'>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.522405186198!2d90.39688885102359!3d23.728743495443645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ef3976bbbd%3A0x1b3140066a1d7bb8!2sDepartment%20of%20Computer%20Science%20and%20Engineering%20and%20Department%20of%20Microbiology!5e0!3m2!1sen!2sbd!4v1602825316789!5m2!1sen!2sbd'
                  width='600'
                  height='450'
                  frameBorder='0'
                  style={{ border: '0' }}
                  allowFullScreen=''
                  aria-hidden='false'
                  tabIndex='0'
                  title='Google Map Location'
                ></iframe>
              </div>
            </div>
          </div>

          <div className='footer_flex_child'>
            <div className='flex_child_header'>
              <p>CONTACT US</p>
            </div>
            <div className='flex_child_info'>
              <div className='flex_single_child'>
                <div className='flex_single_child_icon'>
                  <span className='fa fa-map-marker'> </span>
                </div>
                <div className='flex_single_child_info'>
                  <p className='info_heading'>Address</p>
                  <p className='info_details'>
                    Department of CSE, University of Dhaka (Mokarram Bhaban,
                    Doyel Chattar, Shahbag, Dhaka)
                  </p>
                </div>
              </div>

              <div className='flex_single_child'>
                <div className='flex_single_child_icon'>
                  <span className='fa fa-phone'></span>
                </div>
                <div className='flex_single_child_info'>
                  <p className='info_heading'>Phone</p>
                  <p className='info_details'>+8801938929740</p>
                </div>
              </div>
              <div className='flex_single_child'>
                <div className='flex_single_child_icon'>
                  <span className='fa fa-envelope-open'></span>
                </div>
                <div className='flex_single_child_info'>
                  <p className='info_heading'>Email</p>
                  <p className='info_details'>sakibkhan111296@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <p>Copyright © 2021. Department of CSE, University of Dhaka</p>
          <p>
            Developed by{' '}
            <a
              href='https://www.facebook.com/profile.php?id=100006045795110'
              target='_blank'
              rel='noopener noreferrer'
            >
              Sakib
            </a>
            {' & '}
            <a
              href='https://www.facebook.com/hussain.safwan/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Safwan
            </a>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
