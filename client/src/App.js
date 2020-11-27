import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';

import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import Footer from './components/ui/Footer';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ContactUs from './components/pages/ContactUs';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import NotFound from './components/pages/NotFound';

import AdminPanel from './components/pages/AdminPanel';
import AdminLogin from './components/pages/AdminLogin';
import { connect } from 'react-redux';

import RegisteredTeams from './components/pages/Admin/Teams';
import AdminContact from './components/pages/Admin/Contact';
import AdminForum from './components/pages/Admin/Forum';

import FailedPayment from './components/pages/FailedPayment';
import CancelPayment from './components/pages/CancelPayment';

function App(props) {
  const { isAuthenticated, isAdmin } = props.cred;

  const teamRoutes = (component) => {
    return isAuthenticated && !isAdmin ? component : Login;
  };

  const adminRoutes = (component) => {
    return isAuthenticated && isAdmin ? component : AdminLogin;
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
              <Route exact path='/payment/failed' component={FailedPayment} />
              <Route exact path='/payment/cancel' component={CancelPayment} />
              <Route exact path='/contact' component={ContactUs} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profile' component={teamRoutes(Profile)} />
              <Route exact path='/profile/edit' component={EditProfile} />
              <Route exact path='/admin/login' component={AdminLogin} />
              <Route
                exact
                path={['/admin/teams', '/admin']}
                component={adminRoutes(RegisteredTeams)}
              />
              <Route
                exact
                path='/admin/contact'
                component={adminRoutes(AdminContact)}
              />
              <Route
                exact
                path='/admin/forum'
                component={adminRoutes(AdminForum)}
              />
              <Route component={NotFound} />
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
