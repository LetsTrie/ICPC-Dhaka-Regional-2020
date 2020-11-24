import React, { useEffect, useState } from 'react';
import AdminHeader from '../ui/AdminHeader';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const AdminPanel = (props) => {
  const { isAuthenticated, isAdmin } = props.cred;
  return (
    <div>
      <AdminHeader />
      <p> isAuthenticated: {isAuthenticated} </p>
      <p> isAdmin: {isAdmin ? 1: 0} </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(AdminPanel);
