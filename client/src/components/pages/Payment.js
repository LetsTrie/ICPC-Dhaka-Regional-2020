import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../ui/Header';
import '../../assests/css/paymentConfirm.css';
import { Button } from '@material-ui/core';
import axios from 'axios';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const Payment = ({ match }) => {
  let { teamId } = match.params;
  let query = new URLSearchParams(useLocation().search);
  let teamName = query.get('Team');
  let country = query.get('Country');
  let institution = query.get('Institution');
  let coach = query.get('Coach');
  let success = query.get('Success');
  if (success === 'true') success = true;

  let paymentInitiate = async () => {
    const { data: response } = await axios.get(
      `/api/v1/auth/teamPaymentInitiate?teamId=${teamId}&teamName=${teamName}&country=${country}&institution=${institution}&coach=${coach}`
    );
    // console.log(response); //GatewayPageURL, success, transactionId
    window.location.replace(response.GatewayPageURL);
  };

  return (
    <div>
      <Header />
      <div className='container'>
        <div className='heading'>
          <h1>{success ? 'Payment Completed' :'Confirm Payment'}</h1>
        </div>
        <div className='TeamInformations'>
          <div className='TeamDetails'>
            <div className='td'>
              <p>Team:</p>
              <p>{teamName}</p>
            </div>

            <div className='td'>
              <p>Country:</p>
              <p>{country}</p>
            </div>

            <div className='td'>
              <p>Institution:</p>
              <p>{institution}</p>
            </div>

            <div className='td'>
              <p>Coach:</p>
              <p>{coach}</p>
            </div>
          </div>

          {!success ? (
            <div className='RegFee'>
              <p>Registration Fee</p>
              <p>6000 BDT per team</p>
            </div>
          ) : (
            <div className="RegFee">
              <DoneOutlineIcon style={{fontSize: 100, color: '#1fab89'}} />
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 28, padding: 10 }}>
          <Button
            variant='contained'
            color={success ? 'primary' : 'secondary'}
            style={{ fontSize: 18 }}
            onClick={success ? undefined : paymentInitiate}
          >
            {success ? 'Payment Successful' : 'Proceed to pay'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
