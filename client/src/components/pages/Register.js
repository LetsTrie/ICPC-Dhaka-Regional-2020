import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import '../../assests/css/auth.css';
import logo from '../../assests/images/icpc_logo.png';
import validate from '../../utils/RegValidation';
import Header from '../ui/Header';
import { useDispatch, useSelector } from 'react-redux';

import CustomTextField from '../ui/CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    display: 'none'
  }
});

const Register = () => {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  const [state, setState] = React.useState({
    age: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    if (auth.user) {
      history.push('/');
    }
    if (auth.error == true) {
      setAlert(auth);
      setDisable(false);
    } else if (auth.error == false) {
      setAlert(auth);
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  });

  const addMember = (e) => {
    if (membersInfo.length < 3) {
      setMembersInfo([
        ...membersInfo,
        {
          memberFirstName: '',
          memberLastName: '',
          memberYear: '',
          memberSemester: '',
          memberEmail: '',
          tshirtSize: '',
        },
      ]);
    }
  };
  const deleteMember = (e, i) => {
    if (membersInfo.length > 1) {
      const mInfo = [...membersInfo];
      mInfo.splice(i, 1);
      setMembersInfo(mInfo);
      console.log(membersInfo);
    }
  };

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    coachName: '',
    university: '',
    email: '',
    password: '',
    conPassword: '',
  });
  const [membersInfo, setMembersInfo] = useState([
    {
      memberFirstName: '',
      memberLastName: '',
      memberYear: '',
      memberSemester: '',
      memberEmail: '',
      tshirtSize: '',
      image: null,
    },
    {
      memberFirstName: '',
      memberLastName: '',
      memberYear: '',
      memberSemester: '',
      memberEmail: '',
      tshirtSize: '',
      image: null,
    },
    {
      memberFirstName: '',
      memberLastName: '',
      memberYear: '',
      memberSemester: '',
      memberEmail: '',
      tshirtSize: '',
      image: null,
    },
  ]);
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState(null);
  const [btnDisable, setDisable] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const submit = (e) => {
    const data = {
      teamInfo,
      membersInfo,
    };
    const check = validate(data);
    if (!check.error) {
      const team = {
        teamName: teamInfo.teamName,
        coachFirstName: teamInfo.coachFirstName,
        coachLastName: teamInfo.coachLastName,
        university: teamInfo.university,
        email: teamInfo.email,
        password: teamInfo.password,
        conPassword: teamInfo.conPassword,
        membersInfo,
      };
      console.log(team);
      setDisable(true);
    } else {
      setAlert(check);
    }
  };
  const textStyles = {
    width: '100%',
    marginTop: '15px',
  };
  const linkStyles = {
    textDecoration: 'none',
    color: '#5499C7',
  };
  const handleInputs = (e, i) => {
    console.log(e.target.value);
    const info = [...membersInfo];
    info[i][e.target.name] = e.target.value;
    setMembersInfo(info);
  };
  const handleTeamInfo = (e) => {
    const team = teamInfo;
    team[e.target.name] = e.target.value;
    setTeamInfo(team);
  };
  const handleImageInputs = (e, i) => {
    const img = [...images];
    const info = [...membersInfo];
    img[i] = e.target.files[0];
    info[i].image = e.target.files[0].name;
    setImages(img);
    setMembersInfo(info);
  };

  return (
    <div className='register_wrapper'>
      <Header />
      <div className='register'>
        <div className='register_container'>
          <div className='register_logo'>
            <img src={logo} alt='icpc logo' />
          </div>
          <div className='register_your_team'>
            <p>Register Your Team</p>
          </div>
          <div className='register_flex'>
            <div className='register_flex_left'>
              {alert && (
                <Alert
                  variant='filled'
                  severity={alert.error ? 'error' : 'success'}
                >
                  {alert.msg}
                </Alert>
              )}
              <div className='secondary_heading'>
                <p> Team Information </p>
              </div>
              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextFieldFullWidth}
                  name='teamName'
                  label='Team name'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
              </div>
              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextField}
                  name='coachFirstName'
                  label={'First name (Coach)'}
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
                <CustomTextField
                  className={classes.TextField}
                  name='coachLastName'
                  label={'Last name (Coach)'}
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
              </div>
              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextField}
                  name='coachEmail'
                  label='Email (Coach)'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
                <CustomTextField
                  className={classes.TextField}
                  name='university'
                  label='University'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
              </div>
              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextField}
                  name='password'
                  label='Password'
                  onChange={(e) => handleTeamInfo(e)}
                  type='password'
                />
                <CustomTextField
                  className={classes.TextField}
                  name='conPassword'
                  label='Confirm password'
                  onChange={(e) => handleTeamInfo(e)}
                  type='password'
                />
              </div>

              <div
                className='secondary_heading'
                style={{ paddingTop: '2.2rem' }}
              >
                <p> Members Information </p>
              </div>

              <div className='team_members'>
                {membersInfo.map((member, i) => (
                  <div key={uuidv4()} style={{ paddingBottom: '3.5rem' }}>
                    <div className='member_count'>
                      <p>Participant {i + 1}</p>
                    </div>
                    <div className='flex_row'>
                      <CustomTextField
                        className={classes.TextField}
                        name='memberFirstName'
                        label={'First name (Participant)'}
                        onChange={(e) => handleInputs(e, i)}
                        type='text'
                      />
                      <CustomTextField
                        className={classes.TextField}
                        name='memberLastName'
                        label={'Last name (Participant)'}
                        onChange={(e) => handleInputs(e, i)}
                        type='text'
                      />
                    </div>
                    <div className='flex_row'>
                      <CustomTextField
                        className={classes.TextField}
                        name='memberEmail'
                        label='Email (Participant)'
                        onChange={(e) => handleInputs(e, i)}
                        type='text'
                      />
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel
                          htmlFor='outlined-age-native-simple'
                          className={classes.label}
                        >
                          Year
                        </InputLabel>
                        <Select
                          native
                          value={member.memberYear}
                          onChange={(e) => handleInputs(e, i)}
                          label='Age'
                          inputProps={{
                            name: 'memberYear',
                            id: 'outlined-age-native-simple',
                            style: { fontSize: '1.6rem' },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: '1.45rem',
                              background: 'white',
                              paddingRight: '5px',
                            },
                          }}
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
                          htmlFor='outlined-age-native-simple'
                          className={classes.label}
                        >
                          Semester
                        </InputLabel>
                        <Select
                          native
                          value={member.memberSemester}
                          onChange={(e) => handleInputs(e, i)}
                          label='Age'
                          inputProps={{
                            name: 'memberSemester',
                            id: 'outlined-age-native-simple',
                            style: { fontSize: '1.6rem' },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: '1.45rem',
                              background: 'white',
                              paddingRight: '5px',
                            },
                          }}
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
                          htmlFor='outlined-age-native-simple'
                          className={classes.label}
                        >
                          Tshirt size
                        </InputLabel>
                        <Select
                          native
                          value={member.tshirtSize}
                          onChange={(e) => handleInputs(e, i)}
                          label='Age'
                          inputProps={{
                            name: 'tshirtSize',
                            id: 'outlined-age-native-simple',
                            style: { fontSize: '1.6rem' },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: '1.45rem',
                              background: 'white',
                              paddingRight: '5px',
                            },
                          }}
                        >
                          <option aria-label='None' value='' />
                          <option value={'S'}>S</option>
                          <option value={'M'}>M</option>
                          <option value={'XL'}>XL</option>
                          <option value={'Others'}>Others</option>
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <input
                        accept='image/*'
                        className={classes.input}
                        id='raised-button-file'
                        multiple
                        type='file'
                      />
                      <label htmlFor='raised-button-file'>
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
            </div>
            <div className='register_flex_right'>
              <div className='payment_methods'>
                <p>Payment</p>
              </div>
            </div>
          </div>

          <div className='submit_login' style={{ textAlign: 'center' }}>
            <div className='submit_btn'>
              <Button
                variant='contained'
                onClick={submit}
                disabled={btnDisable}
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
                <Link
                  style={linkStyles}
                  to='/login'
                >
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
