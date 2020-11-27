import React from 'react';
import '../../../assests/css/profile.css';
import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Info from '@material-ui/icons/Info';
import People from '@material-ui/icons/People';
import { useMediaQuery } from '@material-ui/core';

import { connect } from 'react-redux';

const avatarStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

export const Profile = (props) => {
  const { isAuthenticated, teamInfo } = props.cred;
  const avatarClasses = avatarStyles();
  const mobileDevice = useMediaQuery('(min-width: 900px)');

  return (
    <>
      <div className='info-container'>
        <div className='section-header'>
          <Info style={{ fontSize: 30, color: 'ffba60' }} />
          <h4>Team Information</h4>
        </div>
        <div className='section-body'>
          <div className='row'>
            <div className='field'>
              <div className='field-name'>Team Name</div>
              <div className='field-value'>
                {teamInfo.team.charAt(0).toUpperCase() + teamInfo.team.slice(1)}
              </div>
            </div>

            <div className='field'>
              <div className='field-name'>Coach Name</div>
              <div className='field-value'>
                {teamInfo.coach.firstname + ' ' + teamInfo.coach.lastname}
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='field'>
              <div className='field-name'>University</div>
              <div className='field-value'>{teamInfo.university}</div>
            </div>

            <div className='field'>
              <div className='field-name'>Coach Email</div>
              <div className='field-value'>{teamInfo.coach.email}</div>
            </div>
          </div>
        </div>
        <br />
        <div className='section-header'>
          <People style={{ fontSize: 24, color: 'ffba60' }} />
          <h4>Team Members</h4>
        </div>
        <div className='section-body'>
          {teamInfo.participants.map((member) => (
            <div className='each-user' key={uuid()}>
              <div className={`image ${member.dp}`}>
                <Avatar
                  src={`/${member.dp}`}
                  className={
                    mobileDevice ? avatarClasses.large : avatarClasses.small
                  }
                />
              </div>
              <div className='texts'>
                <div className='name'>
                  {member.firstname + ' ' + member.lastname}
                </div>
                <div className='about'>{member.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Profile);
