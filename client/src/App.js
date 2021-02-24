import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';

import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import Footer from './components/ui/Footer';
import ContactUs from './components/pages/ContactUs';
import NotFound from './components/pages/NotFound';
import Teams from './components/pages/Teams';
import Payment from './components/pages/Payment';

import AdminLogin from './components/pages/Admin/Login';
import { connect } from 'react-redux';

import RegisteredTeams from './components/pages/Admin/Teams';
import AdminCustomization from './components/pages/Admin/Customization';
import AdminFAQ from './components/pages/Admin/FAQ'

import FailedPayment from './components/pages/FailedPayment';
import CancelPayment from './components/pages/CancelPayment';
import PaymentNotice from './components/pages/PaymentNotice'

function App(props) {
  const { isAuthenticated, isAdmin } = props.cred;

  const adminRoutes = (component) => {
    return isAuthenticated && isAdmin ? component : AdminLogin;
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/gallery" component={Gallery} />
              <Route exact path="/payment/failed" component={FailedPayment} />
              <Route exact path="/payment/cancel" component={CancelPayment} />
              <Route exact path="/payment/:teamId" component={PaymentNotice} />
              <Route exact path="/teams" component={Teams} />
              <Route exact path="/contact" component={ContactUs} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route
                exact
                path={['/admin/teams', '/admin']}
                component={adminRoutes(RegisteredTeams)}
              />
              <Route
                exact
                path="/admin/customize"
                component={adminRoutes(AdminCustomization)}
              />
              <Route
                exact
                path="/admin/faq"
                component={adminRoutes(AdminFAQ)}
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
