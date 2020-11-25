import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import logo from '../../assests/images/icpclogo_big.png';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Header from '../ui/Header';
import CustomTextField from '../ui/CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import useFormFields from '../HandleForms';
import { loginAction } from '../../action/authentication';
import Loader from '../ui/Loader';

import '../../assests/css/auth.css';

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
  const { isLoading, error } = props.auth;
  const { isAuthenticated } = props.cred;

  // MUI Classes
  const classes = useStyles();

  // Initial State
  let initialState = { team: '', password: '' };
  const { formFields, createChangeHandler } = useFormFields(initialState);

  const params = new URLSearchParams(props.location.search);
  const [checkoutSuccess, setCheckoutSuccess] = useState(
    params.get('checkout') && !error ? true : false
  );

  const handleSubmit = async (e) => {
    if(checkoutSuccess) setCheckoutSuccess(false);
    e.preventDefault();
    console.log(formFields);
    await loginAction(formFields, props.history);
  };

  useEffect(() => {
    
  }, [checkoutSuccess]);

  if(isAuthenticated) {
    return <Redirect to='/'/>
  }

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
      {isLoading && <Loader />}
      <Header />
      <div className='login'>
        <div className='login_container'>
          <div className='login_logo'>
            <img src={logo} alt='icpc' />
          </div>
          <div className='login_header'>
            <p>Team Account Login </p>
          </div>
          {checkoutSuccess && (
            <Alert severity='success' style={{marginBottom: '1.2rem'}}>
              Your registration is successfully completed!
            </Alert>
          )}
          {error && (
            <div style={{ padding: '15px 0' }}>
              <Alert variant='filled' severity='error'>
                {error}
              </Alert>
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
              name='password'
              label='Password'
              onChange={createChangeHandler('password')}
              type='password'
              required={true}
            />

            <p className='login_forget_password'>
              <Link style={styles.linkStyles} to='#'>
                Forgot password?
              </Link>
            </p>
            <Button
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
