import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';

import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import Footer from './components/ui/Footer';
import ContactUs from './components/pages/ContactUs';
import NotFound from './components/pages/NotFound';
import PreliTeams from './components/pages/PreliTeams';
import Teams from './components/pages/Teams';
import Payment from './components/pages/Payment';

import AdminLogin from './components/pages/Admin/Login';
import { connect } from 'react-redux';

import RegisteredTeams from './components/pages/Admin/Teams';
import AdminCustomization from './components/pages/Admin/Customization';
import AdminFAQ from './components/pages/Admin/FAQ';
import AdminEmails from './components/pages/Admin/Emails';

import FailedPayment from './components/pages/FailedPayment';
import CancelPayment from './components/pages/CancelPayment';

import Rules from './components/pages/Rules';
import SteeringCommittee from './components/pages/SteeringCommittee';
import Subcommittees from './components/pages/Subcommittees';
import JudgePanel from './components/pages/JudgePanel';

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
              <Route exact path="/payment/:teamId" component={Payment} />
              <Route exact path="/teams" component={Teams} />
              <Route exact path="/preliminary-teams" component={PreliTeams} />
              <Route exact path="/contact" component={ContactUs} />
              <Route exact path="/admin/login" component={AdminLogin} />
              <Route exact path="/contest-info/Rules" component={Rules} />
              <Route
                exact
                path="/committee/steering-committee"
                component={SteeringCommittee}
              />
              <Route
                exact
                path="/committee/sub-committees"
                component={Subcommittees}
              />
              <Route
                exact
                path="/committee/judging-panel"
                component={JudgePanel}
              />
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
              <Route
                exact
                path="/admin/emails"
                component={adminRoutes(AdminEmails)}
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
