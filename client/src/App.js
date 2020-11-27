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
              <Route exact path='/contact' component={ContactUs} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/profile' component={teamRoutes(Profile)} />
              <Route exact path='/profile/edit' component={EditProfile} />
              <Route exact path='/admin/login' component={AdminLogin} />
              <Route exact path='/admin' component={adminRoutes(AdminPanel)} />
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
