import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import theme from './components/ui/Theme';

import Home from './components/pages/Home';
import Gallery from './components/pages/Gallery';
import ContestInfo from './components/pages/ContestInfo';
import Committee from './components/pages/Committee';
import Footer from './components/ui/Footer';
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import ContactUs from './components/pages/ContactUs';
import Profile from './components/pages/Profile'
import EditProfile from './components/pages/EditProfile'

import Upload from './components/pages/Upload'
import { useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

function App() {
  const userProfile = useSelector(state => state.profile)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log(userProfile)
    if (userProfile.error != null) {
      setError(userProfile)
      console.log(userProfile)
    }
  }, [userProfile])

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/gallery' component={Gallery} />
              <Route
                exact
                path='/registration'
                component={() => <div>Registration</div>}
              />
              <Route
                exact
                path='/registration/online'
                component={Register}
              />
              <Route
                exact
                path='/registration/onsite'
                component={() => <div>Onsite Registration</div>}
              />
              <Route
                exact
                path='/contest-info/:subMenu'
                component={ContestInfo}
              />
              <Route exact path='/committee/:subMenu' component={Committee} />
              <Route
                exact
                path='/contact'
                component={() => <div>Contact us</div>}
              />
              <Route exact path='/login' component={Login} />
              <Route exact path='/upload' component={Upload} />
              <Route exact path='/profile' component={ Profile } />
              <Route exact path='/profile/edit' component={ EditProfile } />
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
      {
        error ? (
        <Snackbar open={true} autoHideDuration={3000}>
          <Alert severity={userProfile.error ? 'error' : 'success'} variant='filled'>
            {error.msg}
          </Alert>
        </Snackbar>
        ) : <div> </div>
      }
      <Footer />
    </div>
  );
}

export default App;
