import React from 'react';
import '../../../assests/css/profile.css';
import Info from '@material-ui/icons/Info';
import { connect } from 'react-redux';

export const Profile = (props) => {
  const { isAuthenticated, teamInfo } = props.cred;

  return (
    <>
      <div className='info-container'>
        <div className='section-header'>
          <Info style={{ fontSize: 30, color: 'ffba60' }} />
          <h4>Update Information</h4>
        </div>
        <div className='section-body'>
          Hello world
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
