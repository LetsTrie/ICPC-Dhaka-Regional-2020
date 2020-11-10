import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import '../../assests/css/auth.css';
import logo from '../../assests/images/icpc_logo.png';
import validate from '../../utils/RegValidation';
import Header from '../ui/Header';
import { register } from '../../action/index';
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from '@material-ui/core';

const Register = () => {
  const auth = useSelector((state) => state.auth);

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
          tshirtSize: ''
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
      console.log(team)
      dispatch(register(team));
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
    <div>
      <Header />
      <div className='Register'>
        <div className='logo'>
          <img src={logo} />
        </div>
        <div className='register-box'>
          <div className='colum left'>
            {alert ? (
              <div style={{padding: '10px 0'}}>
                <Alert
                  variant='filled'
                  severity={alert.error ? 'error' : 'success'}
                >
                  {alert.msg}
                </Alert>
              </div>
            ) : (
              <div></div>
            )}
            <TextField
                style={{ width: '100%' }}
                name='teamName'
                variant='outlined'
                label='Team Name'
                onChange={(e) => handleTeamInfo(e)}
              />
            <div className='side'>
              <TextField
                style={{ width: '48%' }}
                name='coachFirstName'
                variant='outlined'
                label='Coach (First Name)'
                onChange={(e) => handleTeamInfo(e)}
              />
              <TextField
                style={{ width: '48%' }}
                name='coachLastName'
                variant='outlined'
                label='Coach (Last Name)'
                onChange={(e) => handleTeamInfo(e)}
              />
            </div>{' '}
            <br />
            <div className='side'>
              <TextField
                style={{ width: '48%' }}
                name='university'
                variant='outlined'
                label='University'
                onChange={(e) => handleTeamInfo(e)}
              />
              <TextField
                style={{ width: '48%' }}
                name='email'
                variant='outlined'
                label='Team Email'
                onChange={(e) => handleTeamInfo(e)}
              />
            </div>
            <div className='side'>
              <TextField
                style={{ width: '48%' }}
                type='password'
                name='password'
                variant='outlined'
                label='Password'
                onChange={(e) => handleTeamInfo(e)}
              />
              <TextField
                style={{ width: '48%' }}
                type='password'
                name='conPassword'
                variant='outlined'
                label='Confirm password'
                onChange={(e) => handleTeamInfo(e)}
              />
            </div>
            <div className='team-holder'>
              {membersInfo.map((member, i) => (
                <div >
                  <div className='side'>
                    <h3>Participent {i + 1}</h3>
                    <DeleteIcon
                      onClick={(e) => deleteMember(e, i)}
                      style={{
                        marginTop: '10px',
                        cursor: 'pointer',
                        color: 'red',
                      }}
                    />
                  </div>
                  <div className='side'>
              <TextField
                style={{ width: '48%' }}
                name='memberFirstName'
                variant='outlined'
                label='First name of the participent'
                onChange={(e) =>  handleInputs(e, i)}
                value={membersInfo.memberFirstName}
              />
              <TextField
                style={{ width: '48%' }}
                name='memberLastName'
                variant='outlined'
                label='Last name of the participent'
                onChange={(e) => handleInputs(e, i)}
              />
            </div>
                  <br />
                  <div className='side'>
                    <select
                      name='memberYear'
                      onChange={(e) => handleInputs(e, i)}
                    >
                      <option value={''}>Year</option>
                      <option value={'1st'}>1st</option>
                      <option value={'2nd'}>2nd</option>
                      <option value={'3rd'}>3rd</option>
                      <option value={'4th'}>4th</option>
                      <option value={'Masters'}>Masters</option>
                      <option value={'Others'}>Others</option>
                    </select>

                    <select
                      name='memberSemester'
                      onChange={(e) => handleInputs(e, i)}
                    >
                      <option value={''}>Semester</option>
                      <option value={'1st'}>1st</option>
                      <option value={'2nd'}>2nd</option>
                      <option value={'3rd'}>3rd</option>
                      <option value={'4th'}>4th</option>
                    </select>
                  </div>
                  <div className='side'>
                  <TextField
                style={{ width: '48%' }}
                name='memberEmail'
                variant='outlined'
                label='Email address of the participent'
                onChange={(e) =>  handleInputs(e, i)}
              />
              <select
                      name='tshirtSize'
                      onChange={(e) => handleInputs(e, i)}
                    >
                      <option value={''}>Tshirt size</option>
                      <option value={'S'}>S</option>
                      <option value={'M'}>M</option>
                      <option value={'L'}>L</option>
                      <option value={'XL'}>XL</option>
                    </select>
                  </div>
                  <div className='side'>
                  <label className='file-input'>
                      Upload Image
                      <input
                        type='file'
                        name='image'
                        onChange={(e) => handleImageInputs(e, i)}
                      />
                    </label>
                  </div>
                  <br />
                </div>
              ))}
              <Button
                style={{ marginTop: '10px' }}
                variant='contained'
                onClick={addMember}
              >
                Add Member
              </Button>
            </div>
            <p>
              Have an account?{' '}
              <Link style={linkStyles} to='/login'>
                Sign in
              </Link>
            </p>
          </div>
          <div className='colum right'>
            <h3>Payment</h3>
            <div className='lines'>
              <div className='line'>
                <span className=''>Registration fees</span>
                <span>2000/-</span>
              </div>
              <div className='line'>
                <span className=''>Charges</span>
                <span>50/-</span>
              </div>
              <hr />
              <div className='line' style={{ color: '#f50057' }}>
                <span className='bold'>Total</span>
                <span>2050/-</span>
              </div>
            </div>
            <div className='payment-options'>
              <FormControl style={{ marginTop: '50px' }} component='fieldset'>
                <FormLabel component='legend'>
                  <h4>Payment Method</h4>
                </FormLabel>
                <RadioGroup aria-label='gender' name='gender1'>
                  <FormControlLabel
                    value='bkash'
                    control={<Radio />}
                    label='bKash'
                  />
                  <FormControlLabel
                    value='sslcommerz'
                    control={<Radio />}
                    label='SSLCommerz'
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <p style={{ textAlign: 'center' }}>
              <Button
                style={{ marginTop: '120px', width: '50%' }}
                variant='contained'
                onClick={submit}
                disabled={btnDisable}
                color='secondary'
              >
                Submit
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
