import { Button } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../assests/css/paymentConfirm.css';
import Header from '../ui/Header';
import Loader from '../ui/Loader';

const Payment = ({ match }) => {
  let { teamId } = match.params;
  const [team, setTeam] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  let paymentInitiate = async () => {
    try {
      const { data: response } = await axios.get(
        `/api/v1/auth/teamPaymentInitiate/${teamId}`
      );
      // console.log(response); //GatewayPageURL, success, transactionId
      window.location.replace(response.GatewayPageURL);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/v1/admin/teamInfo/${teamId}`)
      .then((res) => {
        setTeam(res.data.team);
        setIsLoading(false);
        if (res.data.team.payment_status != 'Not Paid Yet') setSuccess(true);
      })
      .catch((e) => {
        setTeam(null);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <Header />
      {isLoading || !team ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="heading">
              <h1>{success ? 'Payment Completed' : 'Confirm Payment'}</h1>
            </div>
            <div className="TeamInformations">
              <div className="TeamDetails">
                <div className="td">
                  <p>Team:</p>
                  <p>{team.Team_Name}</p>
                </div>

                <div className="td">
                  <p>Country:</p>
                  <p>{team.Country}</p>
                </div>

                <div className="td">
                  <p>Institution:</p>
                  <p>{team.University}</p>
                </div>

                <div className="td">
                  <p>Coach:</p>
                  <p>{team.Coach}</p>
                </div>

                <div className="td">
                  <p>Member 1:</p>
                  <p>{team.Member1}</p>
                </div>

                <div className="td">
                  <p>Member 2:</p>
                  <p>{team.Member2}</p>
                </div>

                <div className="td">
                  <p>Member 3:</p>
                  <p>{team.Member3}</p>
                </div>
              </div>

              {!success ? (
                <div className="RegFee">
                  <p>Registration Fee</p>
                  <p>300 BDT</p>
                </div>
              ) : (
                <div className="RegFee">
                  <DoneOutlineIcon
                    style={{ fontSize: 100, color: '#1fab89' }}
                  />
                </div>
              )}
            </div>
            {success && (
              <div
                style={{ textAlign: 'center', paddingTop: 20, fontSize: 20 }}
              >
                <p>
                  <span style={{ fontWeight: 'bold' }}>Transition ID:</span>{' '}
                  {team.payment_transition_id}
                </p>
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: 10, padding: 10 }}>
              <Button
                variant="contained"
                color={success ? 'primary' : 'secondary'}
                style={{ fontSize: 18 }}
                onClick={success ? undefined : paymentInitiate}
              >
                {success ? 'Payment Successful' : 'Proceed to pay'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Payment;
