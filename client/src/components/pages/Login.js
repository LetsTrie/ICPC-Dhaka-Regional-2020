import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import logo from '../../assests/images/icpclogo_big.png';
import { Link } from 'react-router-dom';
import { login, adminLogin } from '../../action/index';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import '../../assests/css/auth.css';
import Header from '../ui/Header';
import CustomTextField from '../ui/CustomTextField';
import SSLCommerzPayment from 'sslcommerz';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { json } from 'body-parser';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import useFormFields from '../HandleForms';
import { loginAction } from '../../action/authentication';

const useStyles = makeStyles({
  TextField: {
    width: '100%',
    marginBottom: '1.7rem',
  },
  submitButton: {
    color: '#333',
    marginTop: '1.7rem',
    padding: '1rem',
    fontSize: '1.7rem',
  },
});

const Login = (props) => {
  // Action 
  const { loginAction } = props;
  // Store

  // MUI Classes
  const classes = useStyles();

  // Initial State
  let initialState = { team: '', password: '' };
  const { formFields, createChangeHandler } = useFormFields(initialState);

  // const [isError, setIsError] = useState(null);
  // const dispatch = useDispatch();
  // const history = useHistory();
  // const auth = useSelector((state) => state.auth);

  // const search = props.location.search; // could be '?foo=bar'
  // const params = new URLSearchParams(search);
  // console.log(params.get('checkout'));

  // useEffect(() => {
  //   // if (auth.error) {
  //   //   setIsError(auth);
  //   //   console.log('[Login]', auth);
  //   // } else if (auth.user) {
  //   //   console.log('home redirect');
  //   //   history.push('/');
  //   // }
  // }, [auth]);

  const handleSubmit = async (e) => {
    console.log(formFields);
    e.preventDefault();

    await loginAction(formFields, props.history);

    // const { email, password } = credentials;
    // if (!valid(email) && !valid(password)) {
    //   dispatch(login(credentials));
    // }
  };

  const styles = {
    linkStyles: {
      textDecoration: 'none',
      color: '#3576a2',
    },
    askForRegister: {
      marginTop: '1rem',
      textAlign: 'center',
      fontSize: '1.4rem',
      color: '#555',
    },
  };

  return (
    <div className='login_wrapper'>
      <Header />
      <div className='login'>
        <div className='login_container'>
          <div className='login_logo'>
            <img src={logo} alt='icpc logo' />
          </div>
          <div className='login_header'>
            <p>Team Account Login </p>
          </div>
          {/* {isError && (
            <div style={{ padding: '15px 0' }}>
              <Alert variant='filled' severity='error'>
                {isError.msg}
              </Alert>
            </div>
          )} */}
          <form onSubmit={handleSubmit}>
            <CustomTextField
              className={classes.TextField}
              name='team'
              label='Team name'
              onChange={createChangeHandler('team')}
              type='text'
              required='true'
            />

            <CustomTextField
              className={classes.TextField}
              name='password'
              label='Password'
              onChange={createChangeHandler('password')}
              type='password'
              required='true'
            />

            <p className='login_forget_password'>
              <Link style={styles.linkStyles} to='#'>
                Forgot password?
              </Link>
            </p>
            <Button
              raised
              type='submit'
              variant='contained'
              color='secondary'
              size='large'
              fullWidth={true}
              className={classes.submitButton}
            >
              LOGIN
            </Button>
            <p style={styles.askForRegister}>
              Not registered yet?{'  '}
              <Link style={styles.linkStyles} to='/registration/online'>
                Register your team now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.loginReducer,
  cred: state.credentialReducer,
});

const mapDispatchToAction = { loginAction };
export default connect(mapStateToProps, mapDispatchToAction)(Login);
