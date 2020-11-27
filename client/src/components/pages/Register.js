import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import '../../assests/css/auth.css';
import logo from '../../assests/images/icpc_logo.png';
import Header from '../ui/Header';
import CustomTextField from '../ui/CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import registerInitialState from '../../data/registerInitialState';
import axios from 'axios';
import Loader from '../ui/Loader';
import useFormFields from '../HandleForms';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  TextField: {
    width: '50%',
    marginRight: '1rem',
    marginBottom: '1.8rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  TextFieldFullWidth: {
    width: '100%',
    marginRight: '1rem',
    marginBottom: '1.8rem',
  },
  formControl: {
    width: '50%',
    marginRight: '1rem',
    marginBottom: '1.8rem',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  input: {
    display: 'none',
  },
}));

const numberOfParticipants = 3;

function validation(fld) {
  if (fld.password !== fld.confirmPassword) {
    return 'Password is not matching!';
  }
  if (!fld['coachDp']) {
    return 'Please provide the Display Picture of Coach!';
  }
  if (fld['coachDp'].size > 300 * 1000) {
    return 'Picture size of Coach must be less than 300 KB';
  }
  for (let member = 1; member <= numberOfParticipants; member++) {
    if (!fld[`p${member}Dp`])
      return `Please provide the Display Picture of Participant ${member}`;

    if (fld[`p${member}Dp`].size > 300 * 1000)
      return `Picture size of Participant ${member} must be less than 300 KB`;
  }
  return null;
}

const Register = (props) => {
  const { isAuthenticated } = props.cred;

  // MUI Class
  const classes = useStyles();

  // Initial State
  let initialState = registerInitialState(numberOfParticipants);
  const { formFields, createChangeHandler } = useFormFields(initialState);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    setAlert(null);
    e.preventDefault();
    const errorMessage = validation(formFields);
    if (errorMessage) {
      setLoading(false);
      setAlert(errorMessage);
    } else {
      const reqBody = {};
      const reqFiles = new FormData();
      for (let key in formFields) {
        if (formFields[key] instanceof File) {
          reqFiles.append(key, formFields[key]);
        } else {
          reqBody[key] = formFields[key];
        }
      }

      let coachInfo = {};
      let participants = [{}, {}, {}];
      const formatKey = (s) => s.charAt(0).toLowerCase() + s.slice(1);

      for (let key in reqBody) {
        if (key.startsWith('coach')) {
          let newKey = formatKey(key.split('coach')[1]);
          coachInfo[newKey] = reqBody[key];
          delete reqBody[key];
        }
        for (let el = 1; el <= numberOfParticipants; el++) {
          if (key.startsWith(`p${el}`)) {
            let newKey = formatKey(key.split(`p${el}`)[1]);
            participants[el - 1][newKey] = reqBody[key];
            delete reqBody[key];
          }
        }
      }
      reqBody.coach = coachInfo;
      reqBody.participants = participants;
      reqBody.participants.length = numberOfParticipants;

      const API = `/api/v1/auth/register`;

      try {
        const { data: res } = await axios.post(`${API}/info`, reqBody);
        console.log('Informations uploaded to server...')
        reqFiles.append('SECRET_KEY', res.SECRET_KEY);
        const { data: done } = await axios.post(`${API}/upload`, reqFiles);
        console.log('Files uploaded to server...')
        const trans = await axios.get(
          `${API}/payment/init?key=${done.SECRET_KEY}`
        );
        console.log('Transaction initiated with server...');

        setAlert(null);
        window.location.replace(trans.data.GatewayPageURL);
        setLoading(false);
      } catch (err) {
        console.log(err.response);
        setLoading(false);
        setAlert(err.response.data.message);
      }
    }
  };

  const linkStyles = {
    textDecoration: 'none',
    color: '#5499C7',
  };

  useEffect(() => {
    if (alert) {
      window.scrollTo(0, 0);
    }
  }, [alert, loading]);

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='register_wrapper'>
      {loading && <Loader />}
      <Header />
      <div className='register'>
        <div className='register_container'>
          <div className='register_logo'>
            <img src={logo} alt='icpc logo' />
          </div>
          <div className='register_your_team'>
            <p>Register Your Team</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='register_flex'>
              <div className='register_flex_left'>
                {alert && (
                  <Alert
                    variant='filled'
                    severity='error'
                    style={{ marginBottom: '2rem', fontSize: '1.5rem' }}
                  >
                    {alert}
                  </Alert>
                )}

                <div className='secondary_heading'>
                  <p> Team Information </p>
                </div>
                <div className='flex_row'>
                  <CustomTextField
                    className={classes.TextField}
                    name='team'
                    label='Team name'
                    onChange={createChangeHandler('team')}
                    type='text'
                    required={true}
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name='university'
                    label='University'
                    onChange={createChangeHandler('university')}
                    type='text'
                    required={true}
                  />
                </div>
                <div className='flex_row'>
                  <CustomTextField
                    className={classes.TextField}
                    name='password'
                    label='Password'
                    onChange={createChangeHandler('password')}
                    type='password'
                    required={true}
                    minLength='6'
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name='confirmPassword'
                    label='Confirm password'
                    onChange={createChangeHandler('confirmPassword')}
                    type='password'
                    required={true}
                    minLength='6'
                  />
                </div>

                <div
                  className='secondary_heading'
                  style={{ paddingTop: '2.2rem' }}
                >
                  <p> Coach Information </p>
                </div>
                <div className='flex_row'>
                  <CustomTextField
                    className={classes.TextField}
                    name='coachFirstname'
                    label='First name'
                    onChange={createChangeHandler('coachFirstname')}
                    type='text'
                    required={true}
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name='coachLastname'
                    label={'Last name'}
                    onChange={createChangeHandler('coachLastname')}
                    type='text'
                    required={true}
                  />
                </div>
                <div className='flex_row'>
                  <CustomTextField
                    className={classes.TextField}
                    name='coachEmail'
                    label='Email'
                    onChange={createChangeHandler('coachEmail')}
                    type='email'
                    required={true}
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name='coachAffiliation'
                    label='Affiliation'
                    onChange={createChangeHandler('coachAffiliation')}
                    type='text'
                    required={true}
                  />
                </div>
                <div className='flex_row'>
                  <CustomTextField
                    className={classes.TextField}
                    name='coachDesignation'
                    label='Designation'
                    onChange={createChangeHandler('coachDesignation')}
                    type='text'
                    required={true}
                  />
                  <FormControl
                    variant='outlined'
                    className={classes.formControl}
                  >
                    <InputLabel
                      htmlFor='coachTshirtSizeId'
                      className={classes.label}
                    >
                      Tshirt size
                    </InputLabel>
                    <Select
                      native
                      value={formFields.coachTshirtSize}
                      onChange={createChangeHandler('coachTshirtSize')}
                      label='Tshirt Size'
                      inputProps={{
                        name: 'coachTshirtSize',
                        id: 'coachTshirtSizeId',
                        style: { fontSize: '1.6rem' },
                      }}
                      InputLabelProps={{
                        style: {
                          fontSize: '1.45rem',
                          background: 'white',
                          paddingRight: '5px',
                        },
                      }}
                      required={true}
                    >
                      <option aria-label='None' value='' />
                      <option value={'XS'}>XS</option>
                      <option value={'S'}>S</option>
                      <option value={'M'}>M</option>
                      <option value={'L'}>L</option>
                      <option value={'XL'}>XL</option>
                      <option value={'XXL'}>XXL</option>
                      <option value={'XXXL'}>XXXL</option>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <input
                    accept='image/*'
                    className={classes.input}
                    id='coachDpId'
                    type='file'
                    name='coachDp'
                    onChange={createChangeHandler('coachDp', true)}
                  />
                  <label htmlFor='coachDpId'>
                    <Button
                      variant='contained'
                      component='span'
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload your image
                    </Button>
                  </label>
                </div>

                <div
                  className='secondary_heading'
                  style={{ paddingTop: '3.8rem' }}
                >
                  <p> Participant's Information </p>
                </div>
                <div className='team_members'>
                  {Array(numberOfParticipants)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={`participant-${i}`}
                        style={{ paddingBottom: '3.5rem' }}
                      >
                        <div className='member_count'>
                          <p>Participant {i + 1}</p>
                        </div>
                        <div className='flex_row'>
                          <CustomTextField
                            className={classes.TextField}
                            name={`p${i + 1}Firstname`}
                            label='First name'
                            onChange={createChangeHandler(`p${i + 1}Firstname`)}
                            type='text'
                            required={true}
                          />
                          <CustomTextField
                            className={classes.TextField}
                            name={`p${i + 1}Lastname`}
                            label='Last name'
                            onChange={createChangeHandler(`p${i + 1}Lastname`)}
                            type='text'
                            required={true}
                          />
                        </div>
                        <div className='flex_row'>
                          <CustomTextField
                            className={classes.TextField}
                            name={`p${i + 1}Email`}
                            label='Email'
                            onChange={createChangeHandler(`p${i + 1}Email`)}
                            type='email'
                            required={true}
                          />
                          <FormControl
                            variant='outlined'
                            className={classes.formControl}
                          >
                            <InputLabel
                              htmlFor={`p${i + 1}YearId`}
                              className={classes.label}
                            >
                              Year
                            </InputLabel>
                            <Select
                              native
                              value={formFields[`p${i + 1}Year`]}
                              onChange={createChangeHandler(`p${i + 1}Year`)}
                              label='Year'
                              inputProps={{
                                name: `p${i + 1}Year`,
                                id: `p${i + 1}YearId`,
                                style: { fontSize: '1.6rem' },
                              }}
                              InputLabelProps={{
                                style: {
                                  fontSize: '1.45rem',
                                  background: 'white',
                                  paddingRight: '5px',
                                },
                              }}
                              required={true}
                            >
                              <option aria-label='None' value='' />
                              <option value={'1st'}>1st</option>
                              <option value={'2nd'}>2nd</option>
                              <option value={'3rd'}>3rd</option>
                              <option value={'4th'}>4th</option>
                              <option value={'Masters'}>Masters</option>
                              <option value={'Others'}>Others</option>
                            </Select>
                          </FormControl>
                        </div>
                        <div className='flex_row'>
                          <FormControl
                            variant='outlined'
                            className={classes.formControl}
                          >
                            <InputLabel
                              htmlFor={`p${i + 1}SemesterId`}
                              className={classes.label}
                            >
                              Semester
                            </InputLabel>
                            <Select
                              native
                              value={formFields[`p${i + 1}Semester`]}
                              onChange={createChangeHandler(
                                `p${i + 1}Semester`
                              )}
                              label={`p${i + 1}Semester`}
                              inputProps={{
                                name: `p${i + 1}Semester`,
                                id: `p${i + 1}SemesterId`,
                                style: { fontSize: '1.6rem' },
                              }}
                              InputLabelProps={{
                                style: {
                                  fontSize: '1.45rem',
                                  background: 'white',
                                  paddingRight: '5px',
                                },
                              }}
                              required={true}
                            >
                              <option aria-label='None' value='' />
                              <option value={'1st'}>1st</option>
                              <option value={'2nd'}>2nd</option>
                              <option value={'3rd'}>3rd</option>
                              <option value={'4th'}>4th</option>
                            </Select>
                          </FormControl>

                          <FormControl
                            variant='outlined'
                            className={classes.formControl}
                          >
                            <InputLabel
                              htmlFor={`p${i + 1}TshirtSizeId`}
                              className={classes.label}
                            >
                              Tshirt size
                            </InputLabel>
                            <Select
                              native
                              value={formFields[`p${i + 1}TshirtSize`]}
                              onChange={createChangeHandler(
                                `p${i + 1}TshirtSize`
                              )}
                              label={`p${i + 1}TshirtSize`}
                              inputProps={{
                                name: `p${i + 1}TshirtSize`,
                                id: `p${i + 1}TshirtSizeId`,
                                style: { fontSize: '1.6rem' },
                              }}
                              InputLabelProps={{
                                style: {
                                  fontSize: '1.45rem',
                                  background: 'white',
                                  paddingRight: '5px',
                                },
                              }}
                              required={true}
                            >
                              <option aria-label='None' value='' />
                              <option value={'XS'}>XS</option>
                              <option value={'S'}>S</option>
                              <option value={'M'}>M</option>
                              <option value={'L'}>L</option>
                              <option value={'XL'}>XL</option>
                              <option value={'XXL'}>XXL</option>
                              <option value={'XXXL'}>XXXL</option>
                            </Select>
                          </FormControl>
                        </div>
                        <div className='flex_row'>
                          <CustomTextField
                            className={classes.TextFieldFullWidth}
                            name={`p${i + 1}Affiliation`}
                            label={'Affiliation (Your department name)'}
                            onChange={createChangeHandler(
                              `p${i + 1}Affiliation`
                            )}
                            type='text'
                            required={true}
                          />
                        </div>
                        <div>
                          <input
                            accept='image/*'
                            className={classes.input}
                            id={`p${i + 1}DpId`}
                            type='file'
                            name={`p${i + 1}Dp`}
                            onChange={createChangeHandler(`p${i + 1}Dp`, true)}
                          />
                          <label htmlFor={`p${i + 1}DpId`}>
                            <Button
                              variant='contained'
                              component='span'
                              className={classes.button}
                              startIcon={<CloudUploadIcon />}
                            >
                              Upload your image
                            </Button>
                          </label>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className='register_flex_right'>
                <div className='registrationFee'>
                  <div className='registrationFee__header'>
                    <p>Registration Fee</p>
                  </div>
                  <div className='registrationFee__amount'>
                    <p>6000 BDT per team</p>
                  </div>
                  <div className='registrationFee__des'>
                    <small>
                      ** You will be redirected to the payment method after
                      giving all the informations of the team, coach and
                      participants.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className='submit_login' style={{ textAlign: 'center' }}>
              <div className='submit_btn'>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  style={{
                    padding: '1rem 4rem',
                    fontSize: '1.85rem',
                    marginBottom: '1.2rem',
                  }}
                >
                  Submit
                </Button>
              </div>
              <div className='login_option'>
                <p>
                  Already registered your team?
                  <Link style={linkStyles} to='/login'>
                    Click here!
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Register);
