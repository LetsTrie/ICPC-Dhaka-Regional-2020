import React, { useState, useEffect } from 'react';
import Header from '../ui/Header';
import '../../assests/css/profile.css';
import Divider from '@material-ui/core/Divider';

import gravatar from '../../assests/images/gravatar.png';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Edit from '@material-ui/icons/Edit';
import People from '@material-ui/icons/People';

import { connect } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';

import TeamInformations from '../ui/Profile/TeamInformations';
import UpdateInformations from '../ui/Profile/UpdateInformations';
import UpdatePassword from '../ui/Profile/UpdatePassword';
import Loader from '../ui/Loader';

export const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, teamInfo } = props.cred;
  const { history } = props;
  const params = new URLSearchParams(props.location.search).get('v');
  const profileComponent = () => {
    return params === 'update-information' ? (
      <UpdateInformations isLoading={isLoading} setIsLoading={setIsLoading} />
    ) : params === 'update-password' ? (
      <UpdatePassword isLoading={isLoading} setIsLoading={setIsLoading} />
    ) : (
      <TeamInformations isLoading={isLoading} setIsLoading={setIsLoading}  />
    );
  };

  useEffect(() => {}, [params]);
  const { pathname } = window.location;

  return (
    <div className='profile'>
      <Header />
      {isLoading && <Loader />}
      <div className='profile__wrapper'>
        <div className='flex_parent'>
          <div className='flex_child'>
            <div className='teamImageNameUniv'>
              <div className='teamImageNameUniv__img'>
                <img src={gravatar} alt='Simple Coding Photo' />
              </div>
              <div className='teamImageNameUniv__name_univ'>
                <p> {teamInfo.team} </p>
                <p> {teamInfo.university} </p>
              </div>
            </div>
            <Divider />
            <div className='tabs'>
              <div
                className={
                  params !== 'update-information' &&
                  params !== 'update-password'
                    ? 'tab selected'
                    : 'tab'
                }
                onClick={() => history.push('/profile?v=team-info')}
              >
                <People />
                <p>Team Information</p>
              </div>

              <div
                className={
                  params === 'update-information' ? 'tab selected' : 'tab'
                }
                onClick={() => history.push('/profile?v=update-information')}
              >
                <Edit />
                <p>Update Information</p>
              </div>

              <div
                className={
                  params === 'update-password' ? 'tab selected' : 'tab'
                }
                onClick={() => history.push('/profile?v=update-password')}
              >
                <LockOpenOutlined />
                <p>Update Password</p>
              </div>
            </div>
          </div>

          <div className='flex_child'>{profileComponent()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Profile);
