import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import logo from '../../assests/images/icpclogo_big.png';
import { Link } from 'react-router-dom';
import { login } from '../../action/index';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import '../../assests/css/auth.css';
import Header from '../ui/Header';
import CustomTextField from '../ui/CustomTextField';

import { makeStyles } from '@material-ui/core/styles';

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

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.error) {
      setIsError(auth);
      console.log('[Login]', auth);
    } else if (auth.user) {
      console.log('home redirect');
      history.push('/');
    }
  }, [auth]);

  const valid = (data) => {
    return data == null || data == '' || data == undefined;
  };

  const handleInput = (e) => {
    const cred = credentials;
    cred[e.target.name] = e.target.value;
    setCredentials(cred);
  };
  const submit = (e) => {
    const { email, password } = credentials;
    if (!valid(email) && !valid(password)) {
      dispatch(login(credentials));
    }
  };

  const classes = useStyles();

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
            <img src={logo} alt='icpc' />
          </div>
          <div className='login_header'>
            <p>Team Account Login</p>
          </div>
          {isError && (
            <Alert variant='filled' severity='error'>
              {isError.msg}
            </Alert>
          )}
          <CustomTextField
            className={classes.TextField}
            name='email'
            label='Team Email'
            onChange={(e) => handleInput(e)}
            type='text'
          />

          <br />

          <CustomTextField
            className={classes.TextField}
            type='password'
            name='password'
            label='Password'
            onChange={(e) => handleInput(e)}
          />

          <p className='login_forget_password'>
            <Link style={styles.linkStyles} to='#'>
              Forgot password?
            </Link>
          </p>
          <Button
            variant='contained'
            onClick={submit}
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
        </div>
      </div>
    </div>
  );
};

export default Login;
