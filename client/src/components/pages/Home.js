import React, { useState, useEffect } from 'react';
import '../../assests/css/home.css';
import Header from '../ui/Header';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Countdown from '../ui/CountDown';
import { useHistory } from 'react-router-dom';
import Sponsors from '../ui/Sponsors';
import ImportantInfos from '../ui/ImportantInfos';
import Organizer from '../ui/Organizer';


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    fontSize: '17.5px',
  },
});

function Home() {
  const classes = useStyles();

    /* -- Authentication manager -- */
  const history = useHistory()
  const logout = e => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    console.log('logged out')
    window.location.reload(false)
  }
  const [isLoggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoggedIn(true)
    }
  }, [ ])
  /* -- Ends --*/

const handleRegister = e => {
  history.push('/registration/online')
}

  return (
    <div className='Home'>
      <div className='Home__navbar'>
        <Header />
        { 
          // Dummy logout button 
          isLoggedIn ? <p style={{fontSize: '25px', cursor: 'pointer', textAlign: 'right'}} onClick={logout}>
          Logout
          </p> : <div> </div>
        }
        <div className='Home__banner_text'>
          <div className='Home__banner_text-primary'>
            <h1>ICPC Dhaka Regional 2020</h1>
          </div>
          <div className='Home__banner_text-secondary'>
            <h3>
              Organized by <span>University of Dhaka</span>
            </h3>
          </div>
          <Countdown />

          <div className='Home_banner_button'>
            <Button variant='contained' className={classes.root} onClick={handleRegister}>
              Register your team
            </Button>
          </div>
        </div>
      </div>
      <Organizer />
      <ImportantInfos />
      <Sponsors />
    </div>
  );
}

export default Home;
