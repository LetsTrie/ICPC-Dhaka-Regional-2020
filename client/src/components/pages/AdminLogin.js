import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import logo from '../../assests/images/icpclogo_big.png';
import {  Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import AdminHeader from '../ui/AdminHeader';
import CustomTextField from '../ui/CustomTextField';

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
    marginTop: '.5rem',
    marginBottom: '.7rem',
    padding: '1rem',
    fontSize: '1.7rem',
  },
});

const AdminLogin = (props) => {
  // Action
  const { loginAction } = props;
  
  // Store
  const { isLoading, error } = props.auth;
  const { isAuthenticated, isAdmin } = props.cred;

  // MUI Class
  const classes = useStyles();

  // Initial State
  let initialState = { username: '', password: '' };
  const { formFields, createChangeHandler } = useFormFields(initialState);

  useEffect(() => {}, []);

  // Already logged in?
  if (isAuthenticated) {
    return <Redirect to={isAdmin ? '/admin' : '/'} />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginAction(formFields, props.history, true);
  };

  // const styles = {
  //   linkStyles: {
  //     textDecoration: 'none',
  //     color: '#3576a2',
  //   },
  //   askForRegister: {
  //     marginTop: '1rem',
  //     textAlign: 'center',
  //     fontSize: '1.4rem',
  //     color: '#555',
  //   },
  // };

  return (
    <div className='login_wrapper admin_login_wrapper'>
      {isLoading && <Loader />}
      <AdminHeader />
      <div className='login'>
        <div className='login_container'>
          <div className='login_logo'>
            <img src={logo} alt='icpc' />
          </div>
          <div className='login_header'>
            <p>Admin Login </p>
          </div>
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
              name='username'
              label='Username'
              onChange={createChangeHandler('username')}
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
export default connect(mapStateToProps, mapDispatchToAction)(AdminLogin);
