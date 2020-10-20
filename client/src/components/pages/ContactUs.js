import React from 'react';
import Header from '../ui/Header';
import '../../assests/css/contact.css';

function ContactUs() {
  return (
    <div>
      <div className='contact'>
        <div className='contact__nav'>
          <Header />
        </div>

        <div className='contact__header'>
          <h1> Contact us </h1>
        </div>

        <section>
          <div className='contactUsForm'>
            <div className='contactUsForm_flx'>
              <div className='contactUsForm_flx_form'>
                <form action='#' onSubmit={(e) => e.preventDefault()}>
                  <div className='textbox'>
                    <label htmlFor='nameID'>Full Name</label> <br />
                    <input
                      type='text'
                      placeholder='Your full name'
                      autoComplete='off'
                      id='nameID'
                    />
                  </div>

                  <div className='textbox'>
                    <label htmlFor='emailID'>Email</label> <br />
                    <input
                      type='text'
                      placeholder='Your email address'
                      autoComplete='off'
                      id='emailID'
                    />
                  </div>

                  <div className='textarea'>
                    <label htmlFor='messageID'> Your message </label> <br />
                    <textarea
                      id='messageID'
                      rows='4'
                      placeholder='Write down your message in details'
                    ></textarea>
                  </div>

                  <div className='submitButton text-center'>
                    <button>Submit</button>
                  </div>
                </form>
              </div>
              <div className='contactUsForm_flx_contact'>
                <div className='contactUsForm_flx_contact_header'>
                  <p>Reach us</p>
                </div>
                <div className='contactUsForm_flx_contact_info'>
                  <div className='contactUsForm_flx_contact_info_icon'>
                    <span className='fa fa-envelope'></span>
                  </div>
                  <div className='contactUsForm_flx_contact_info_des'>
                    <p>sakibkhan111296@gmail.com</p>
                  </div>
                </div>
                <div className='contactUsForm_flx_contact_info'>
                  <div className='contactUsForm_flx_contact_info_icon'>
                    <span className='fa fa-phone'></span>
                  </div>
                  <div className='contactUsForm_flx_contact_info_des'>
                    <p className='contactUsForm_flx_contact_info_des_phone'>
                    +8801938929740
                    </p>
                  </div>
                </div>

                <div className='contactUsForm_flx_contact_info'>
                  <div className='contactUsForm_flx_contact_info_icon'>
                    <span className='fa fa-map-marker'></span>
                  </div>
                  <div className='contactUsForm_flx_contact_info_des'>
                    <p>
                    Department of CSE, University of Dhaka (Mokarram Bhaban, Doyel Chattar, Shahbag, Dhaka)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='contact__map'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.522405186198!2d90.39688885102359!3d23.728743495443645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ef3976bbbd%3A0x1b3140066a1d7bb8!2sDepartment%20of%20Computer%20Science%20and%20Engineering%20and%20Department%20of%20Microbiology!5e0!3m2!1sen!2sbd!4v1603003947488!5m2!1sen!2sbd'
            width='100%'
            height='450'
            frameBorder='0'
            style={{ border: '0' }}
            allowFullScreen=''
            aria-hidden='false'
            tabIndex='0'
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
