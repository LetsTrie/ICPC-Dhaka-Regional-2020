import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { contactUsAction } from '../../action/contactUs';
import { CONTACT_INIT } from '../../action/types';
import '../../assests/css/contact.css';
import useFormFields from '../HandleForms';
import FAQ from '../ui/FAQ';
import Header from '../ui/Header';
import Loader from '../ui/Loader';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ContactUs(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  // Initial State
  let initialState = { name: '', email: '', message: '' };
  const { formFields, createChangeHandler, resetForm } = useFormFields(
    initialState
  );

  // Dispatch
  const dispatch = useDispatch();

  // Action & Store
  const { contactUsAction } = props;
  const { error, isLoading, formSuccess } = props.contact;

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await contactUsAction(formFields);
  };

  // Reset Form
  useEffect(() => {
    if (formSuccess) {
      resetForm();
      setTimeout(() => dispatch({ type: CONTACT_INIT }), 5000);
    }
  }, [formSuccess]);

  return (
    <div>
      <div className="contact">
        {isLoading && <Loader />}
        <div className="contact__nav">
          <Header />
        </div>

        <div className="contact__header">
          <h1> Contact us </h1>
        </div>

        <section>
          <div className="contactUsForm">
            <div className="contactUsForm_flx">
              <div className="contactUsForm_flx_form">
                {formSuccess && (
                  <Alert severity="success" style={{ marginBottom: '1.2rem' }}>
                    We've received your message. We'll get back to you shortly.
                  </Alert>
                )}
                {error && (
                  <div style={{ padding: '15px 0' }}>
                    <Alert variant="filled" severity="error">
                      {error}
                    </Alert>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="textbox">
                    <label htmlFor="nameID">Full Name</label> <br />
                    <input
                      placeholder="Full name"
                      autoComplete="off"
                      name="name"
                      type="text"
                      id="nameID"
                      onChange={createChangeHandler('name')}
                      value={formFields.name}
                      required={true}
                      minLength="3"
                    />
                  </div>
                  <div className="textbox">
                    <label htmlFor="emailID">Email</label> <br />
                    <input
                      type="text"
                      placeholder="Email address"
                      autoComplete="off"
                      name="email"
                      type="email"
                      id="emailID"
                      onChange={createChangeHandler('email')}
                      required={true}
                      value={formFields.email}
                    />
                  </div>

                  <div className="textbox">
                    <label htmlFor="categoryID">Choose category </label> <br />
                    <select
                      name="category"
                      id="categoryID"
                      className="optionContainer"
                      value={category}
                      onChange={handleChange}
                      style={
                        category === ''
                          ? {
                              fontSize: '1.6rem',
                              color: '#bbbbbb',
                            }
                          : {}
                      }
                    >
                      <option value="" disabled selected>
                        Select your option
                      </option>
                      <option value="Registration Fee Related">
                        Registration Fee Related
                      </option>
                      <option value="Contest Related">Contest Related</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div className="textarea">
                    <label htmlFor="messageID"> Your message </label> <br />
                    <textarea
                      id="messageID"
                      rows="4"
                      placeholder="Write down your message in details"
                      name="message"
                      type="text"
                      onChange={createChangeHandler('message')}
                      required={true}
                      minLength={10}
                      value={formFields.message}
                    ></textarea>
                  </div>

                  <div className="submitButton text-center">
                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>
              <div className="contactUsForm_flx_contact">
                <div className="contactUsForm_flx_contact_header">
                  <p>Reach us</p>
                </div>
                <div className="contactUsForm_flx_contact_info">
                  <div className="contactUsForm_flx_contact_info_icon">
                    <span className="fa fa-envelope"></span>
                  </div>
                  <div className="contactUsForm_flx_contact_info_des">
                    <p>office@cse.du.ac.bd</p>
                  </div>
                </div>
                <div className="contactUsForm_flx_contact_info">
                  <div className="contactUsForm_flx_contact_info_icon">
                    <span className="fa fa-phone"></span>
                  </div>
                  <div className="contactUsForm_flx_contact_info_des">
                    <p className="contactUsForm_flx_contact_info_des_phone">
                      +88029670734
                    </p>
                  </div>
                </div>

                <div className="contactUsForm_flx_contact_info">
                  <div className="contactUsForm_flx_contact_info_icon">
                    <span className="fa fa-map-marker"></span>
                  </div>
                  <div className="contactUsForm_flx_contact_info_des">
                    <p>
                      Department of CSE, 3rd Floor, Science Complex Building
                      (Near Mukarram Bhaban, Doyel Chattar, Shahbag, Dhaka)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="contact__faq">
          <div className="contact__header">
            <h1> FAQ </h1>
          </div>
          <div className="faq_container">
            <FAQ
              id={'RANDOM_ID_FROM_UUID'}
              title={'এই কোর্স কাদের জন্য?'}
              description={
                'যারা ওয়েব ডেভেলপার হতে চায়। যারা একদম শূন্য থেকে শুরু করে শেষ পর্যন্ত ওয়েব ডেভেলপমেন্ট শিখে তারপর ওয়েব ডেভেলপার হিসেবে কোন সফটওয়্যার কোম্পানিতে চাকরি করতে চায়, তাদের জন্য। যারা প্রোগ্রামিং বা ওয়েব ডেভেলপমেন্ট সম্পর্কে তেমন কিছুই জানে না, তাদের জন্য। এমনকি যারা চার বছর CSE পড়েও কিভাবে কি করবে দিশা করতে পারতেছে না, গুছিয়ে তেমন কিছু শিখেনি, তারাও এই কোর্স থেকে কমপ্লিট ওয়েব ডেভেলপমেন্ট শিখে চাকরিতে এপ্লাই করতে পারবে। 😀'
              }
            />
            <FAQ
              id={'RANDOM_ID_FROM_UUID'}
              title={'এই কোর্স কাদের জন্য?'}
              description={
                'যারা ওয়েব ডেভেলপার হতে চায়। যারা একদম শূন্য থেকে শুরু করে শেষ পর্যন্ত ওয়েব ডেভেলপমেন্ট শিখে তারপর ওয়েব ডেভেলপার হিসেবে কোন সফটওয়্যার কোম্পানিতে চাকরি করতে চায়, তাদের জন্য। যারা প্রোগ্রামিং বা ওয়েব ডেভেলপমেন্ট সম্পর্কে তেমন কিছুই জানে না, তাদের জন্য। এমনকি যারা চার বছর CSE পড়েও কিভাবে কি করবে দিশা করতে পারতেছে না, গুছিয়ে তেমন কিছু শিখেনি, তারাও এই কোর্স থেকে কমপ্লিট ওয়েব ডেভেলপমেন্ট শিখে চাকরিতে এপ্লাই করতে পারবে। 😀'
              }
            />
            <FAQ
              id={'RANDOM_ID_FROM_UUID'}
              title={'এই কোর্স কাদের জন্য?'}
              description={
                'যারা ওয়েব ডেভেলপার হতে চায়। যারা একদম শূন্য থেকে শুরু করে শেষ পর্যন্ত ওয়েব ডেভেলপমেন্ট শিখে তারপর ওয়েব ডেভেলপার হিসেবে কোন সফটওয়্যার কোম্পানিতে চাকরি করতে চায়, তাদের জন্য। যারা প্রোগ্রামিং বা ওয়েব ডেভেলপমেন্ট সম্পর্কে তেমন কিছুই জানে না, তাদের জন্য। এমনকি যারা চার বছর CSE পড়েও কিভাবে কি করবে দিশা করতে পারতেছে না, গুছিয়ে তেমন কিছু শিখেনি, তারাও এই কোর্স থেকে কমপ্লিট ওয়েব ডেভেলপমেন্ট শিখে চাকরিতে এপ্লাই করতে পারবে। 😀'
              }
            />
          </div>
        </div>

        <div className="contact__map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.522405186198!2d90.39688885102359!3d23.728743495443645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8ef3976bbbd%3A0x1b3140066a1d7bb8!2sDepartment%20of%20Computer%20Science%20and%20Engineering%20and%20Department%20of%20Microbiology!5e0!3m2!1sen!2sbd!4v1603003947488!5m2!1sen!2sbd"
            width="100%"
            height="450"
            frameBorder="0"
            style={{ border: '0' }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contact: state.contactUsReducer,
});

const mapDispatchToAction = { contactUsAction };
export default connect(mapStateToProps, mapDispatchToAction)(ContactUs);
