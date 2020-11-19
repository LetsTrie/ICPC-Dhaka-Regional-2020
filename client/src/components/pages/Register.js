import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import '../../assests/css/auth.css';
import logo from '../../assests/images/icpc_logo.png';
import validate from '../../utils/RegValidation';
import Header from '../ui/Header';
import { useDispatch, useSelector } from 'react-redux';
import CustomTextField from '../ui/CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import registerInitialState from '../../data/registerInitialState';
const axios = require('axios');

const useStyles = makeStyles({
  TextField: {
    width: '50%',
    marginRight: '1rem',
    marginBottom: '1.8rem',
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
  },
  input: {
    display: 'none',
  },
});

function useFormFields(initialValues) {
  const [formFields, setFormFields] = React.useState(initialValues);
  const createChangeHandler = (key, isFile = false) => (e) => {
    let value;
    if (isFile) value = e.target.files[0];
    else value = e.target.value;
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };
  return { formFields, createChangeHandler };
}

const Register = () => {
  // MUI Class
  const classes = useStyles();

  let numberOfParticipants = 1;

  // Initial State
  let initialState = registerInitialState(numberOfParticipants);
  const { formFields, createChangeHandler } = useFormFields(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = {};
    const reqFiles = new FormData();
    for (let key in formFields) {
      if (formFields[key] instanceof File) {
        reqFiles.append(key, formFields[key]);
      } else {
        reqBody[key] = formFields[key];
      }
    }
    const API = `http://localhost:5000/api/v1/auth/register`;

    axios.post(`${API}/info`, reqBody).then((res) => {
      console.log(res);
      axios.post(`${API}/upload`, reqFiles).then((uploaded) => {
        console.log(uploaded);
      });
    });
  };

  // const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (auth.user) {
  //     history.push('/');
  //   }
  //   if (auth.error == true) {
  //     setAlert(auth);
  //     setDisable(false);
  //   } else if (auth.error == false) {
  //     setAlert(auth);
  //     setTimeout(() => {
  //       history.push('/login');
  //     }, 3000);
  //   }
  // });

  // const [images, setImages] = useState([]);
  // const [alert, setAlert] = useState(null);
  const [btnDisable, setDisable] = useState(false);
  // const history = useHistory();
  // const dispatch = useDispatch();
  const submit = (e) => {};
  const linkStyles = {
    textDecoration: 'none',
    color: '#5499C7',
  };

  return (
    <div className="register_wrapper">
      <Header />
      <div className="register">
        <div className="register_container">
          <div className="register_logo">
            <img src={logo} alt="icpc logo" />
          </div>
          <div className="register_your_team">
            <p>Register Your Team</p>
          </div>
          <div className="register_flex">
            <div className="register_flex_left">
              {/* {alert && (
                <Alert
                  variant='filled'
                  severity={alert.error ? 'error' : 'success'}
                >
                  {alert.msg}
                </Alert>
              )} */}
              <form onSubmit={handleSubmit}>
                <div className="secondary_heading">
                  <p> Team Information </p>
                </div>
                <div className="flex_row">
                  <CustomTextField
                    className={classes.TextField}
                    name="teamName"
                    label="Team name"
                    onChange={createChangeHandler('teamName')}
                    type="text"
                    required="true"
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name="university"
                    label="University"
                    onChange={createChangeHandler('university')}
                    type="text"
                    required="true"
                  />
                </div>
                <div className="flex_row">
                  <CustomTextField
                    className={classes.TextField}
                    name="password"
                    label="Password"
                    onChange={createChangeHandler('password')}
                    type="password"
                    required="true"
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name="confirmPassword"
                    label="Confirm password"
                    onChange={createChangeHandler('confirmPassword')}
                    type="password"
                    required="true"
                  />
                </div>

                <div
                  className="secondary_heading"
                  style={{ paddingTop: '2.2rem' }}
                >
                  <p> Coach Information </p>
                </div>
                <div className="flex_row">
                  <CustomTextField
                    className={classes.TextField}
                    name="coachFirstName"
                    label={'First name'}
                    onChange={createChangeHandler('coachFirstName')}
                    type="text"
                    required="true"
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name="coachLastName"
                    label={'Last name'}
                    onChange={createChangeHandler('coachLastName')}
                    type="text"
                    required="true"
                  />
                </div>
                <div className="flex_row">
                  <CustomTextField
                    className={classes.TextField}
                    name="coachEmail"
                    label="Email"
                    onChange={createChangeHandler('coachEmail')}
                    type="text"
                    required="true"
                  />
                  <CustomTextField
                    className={classes.TextField}
                    name="coachAffiliation"
                    label="Affiliation"
                    onChange={createChangeHandler('coachAffiliation')}
                    type="text"
                    required="true"
                  />
                </div>
                <div className="flex_row">
                  <CustomTextField
                    className={classes.TextField}
                    name="coachDesignation"
                    label="Designation"
                    onChange={createChangeHandler('coachDesignation')}
                    type="text"
                    required="true"
                  />
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel
                      htmlFor="coachTshirtSizeId"
                      className={classes.label}
                    >
                      Tshirt size
                    </InputLabel>
                    <Select
                      native
                      value={formFields.coachTshirtSize}
                      onChange={createChangeHandler('coachTshirtSize')}
                      label="Tshirt Size"
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
                      required="true"
                    >
                      <option aria-label="None" value="" />
                      <option value={'XS'}>XS</option>
                      <option value={'S'}>S</option>
                      <option value={'M'}>M</option>
                      <option value={'XL'}>XL</option>
                      <option value={'XXL'}>XXL</option>
                      <option value={'XXXL'}>XXXL</option>
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="coachDpId"
                    type="file"
                    name="coachDp"
                    onChange={createChangeHandler('coachDp', true)}
                  />
                  <label htmlFor="coachDpId">
                    <Button
                      raised
                      variant="contained"
                      component="span"
                      className={classes.button}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload your image
                    </Button>
                  </label>
                </div>

                <div
                  className="secondary_heading"
                  style={{ paddingTop: '3.8rem' }}
                >
                  <p> Participant's Information </p>
                </div>
                <div className="team_members">
                  {Array(numberOfParticipants)
                    .fill()
                    .map((_, i) => (
                      <div
                        key={`participant-${i}`}
                        style={{ paddingBottom: '3.5rem' }}
                      >
                        <div className="member_count">
                          <p>Participant {i + 1}</p>
                        </div>
                        <div className="flex_row">
                          <CustomTextField
                            className={classes.TextField}
                            name={`p${i + 1}Firstname`}
                            label={'First name'}
                            onChange={createChangeHandler(`p${i + 1}Firstname`)}
                            type="text"
                            required="true"
                          />
                          <CustomTextField
                            className={classes.TextField}
                            name={`p${i + 1}Lastname`}
                            label={'Last name'}
                            onChange={createChangeHandler(`p${i + 1}Lastname`)}
                            type="text"
                            required="true"
                          />
                        </div>
                        <div className="flex_row">
                          <CustomTextField
                            className={classes.TextField}
                            name={`p${i + 1}Email`}
                            label="Email"
                            onChange={createChangeHandler(`p${i + 1}Email`)}
                            type="text"
                            required="true"
                          />
                          <FormControl
                            variant="outlined"
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
                              label="Year"
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
                              required="true"
                            >
                              <option aria-label="None" value="" />
                              <option value={'1st'}>1st</option>
                              <option value={'2nd'}>2nd</option>
                              <option value={'3rd'}>3rd</option>
                              <option value={'4th'}>4th</option>
                              <option value={'Masters'}>Masters</option>
                              <option value={'Others'}>Others</option>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="flex_row">
                          <FormControl
                            variant="outlined"
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
                              required="true"
                            >
                              <option aria-label="None" value="" />
                              <option value={'1st'}>1st</option>
                              <option value={'2nd'}>2nd</option>
                              <option value={'3rd'}>3rd</option>
                              <option value={'4th'}>4th</option>
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
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
                              required="true"
                            >
                              <option aria-label="None" value="" />
                              <option value={'S'}>S</option>
                              <option value={'M'}>M</option>
                              <option value={'XL'}>XL</option>
                              <option value={'Others'}>Others</option>
                            </Select>
                          </FormControl>
                        </div>
                        <div className="flex_row">
                          <CustomTextField
                            className={classes.TextFieldFullWidth}
                            name={`p${i + 1}Affiliation`}
                            label={'Affiliation (Your department name)'}
                            onChange={createChangeHandler(
                              `p${i + 1}Affiliation`
                            )}
                            type="text"
                            required="true"
                          />
                        </div>
                        <div>
                          <input
                            accept="image/*"
                            className={classes.input}
                            id={`p${i + 1}DpId`}
                            type="file"
                            onChange={createChangeHandler(`p${i + 1}Dp`, true)}
                            required="true"
                          />
                          <label htmlFor={`p${i + 1}DpId`}>
                            <Button
                              raised
                              variant="contained"
                              component="span"
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
                <Button type="submit"> SUBMIT </Button>
              </form>
            </div>
            <div className="register_flex_right">
              <div className="payment_methods">
                <p>Payment</p>
              </div>
            </div>
          </div>

          <div className="submit_login" style={{ textAlign: 'center' }}>
            <div className="submit_btn">
              <Button
                variant="contained"
                onClick={submit}
                disabled={btnDisable}
                color="secondary"
                style={{
                  padding: '1rem 4rem',
                  fontSize: '1.85rem',
                  marginBottom: '1.2rem',
                }}
              >
                Submit
              </Button>
            </div>
            <div className="login_option">
              <p>
                Already registered your team?
                <Link style={linkStyles} to="/login">
                  Click here!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
