import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';

import Header from './components/ui/Header';
import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import ContestInfo from './components/pages/ContestInfo';
import Committee from './components/pages/Committee';
import Footer from './components/ui/Footer';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ContactUs from './components/pages/ContactUs';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import Temp from './components/pages/Temp';

import Admin from './components/pages/Admin';
import AdminLogin from './components/pages/AdminLogin';

import Upload from './components/pages/Upload';
import { useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { adminLogin } from './action';

import { connect } from 'react-redux';

function App(props) {
  const { isAuthenticated } = props.cred;

  const protectedRoutes = (component, role = 'team') => {
    let loginPage = role === 'admin' ? Login : AdminLogin;
    return isAuthenticated ? component : loginPage;
  };

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/gallery' component={Gallery} />
              <Route exact path='/registration/online' component={Register} />
              <Route
                exact
                path='/contest-info/:subMenu'
                component={ContestInfo}
              />
              <Route exact path='/committee/:subMenu' component={Committee} />
              <Route exact path='/contact' component={ContactUs} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/upload' component={Upload} />
              <Route exact path='/profile' component={protectedRoutes(Profile)} />
              <Route exact path='/profile/edit' component={EditProfile} />
              <Route exact path='/temp' component={Temp} />
              <Route exact path='/admin/login' component={AdminLogin} />
              <Route exact path='/admin' component={Admin} />
              <Route
                exact
                path='/admin/denied'
                component={() => (
                  <>
                    <Header />
                    <div style={{ fontSize: 25 }}>Admin access denied</div>
                  </>
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(App);
