import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React from 'react';
import '../../assests/css/home.css';
import Countdown from '../ui/CountDown';
import Header from '../ui/Header';
import ImportantInfos from '../ui/ImportantInfos';
import Organizer from '../ui/Organizer';
import Sponsors from '../ui/Sponsors';

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

  const showFile = async (url) => {
    try {
      await axios.get(url);
      let completeUrl =
        window.location.protocol + '//' + window.location.host + url;
      if (process.env.NODE_ENV === 'development')
        completeUrl = 'http://localhost:5000' + url;

      window.open(completeUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Home">
      <div className="Home__navbar">
        <Header />
        <div className="Home__banner_text">
          <div className="Home__banner_text-primary">
            <h1>ICPC Dhaka Regional 2020</h1>
          </div>
          <div className="Home__banner_text-secondary">
            <h2>Organized by</h2>
            <h3>Department of Computer Science and Engineering</h3>
            <h5>University of Dhaka</h5>
          </div>
          <Countdown />
          <div className="Home_banner_button">
            <Button
              variant="contained"
              className={classes.root}
              onClick={() => showFile('/informations-for-participants.pdf')}
            >
              Contest Guideline
            </Button>
            <Button
              variant="contained"
              className={classes.root}
              onClick={() => showFile('/program-schedule.pdf')}
            >
              Program Schedule
            </Button>

            <Button
              variant="contained"
              className={classes.root}
              onClick={() => (window.location = '#importantDatesId')}
            >
              Important Date
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
