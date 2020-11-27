import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux';
import { logoutAction } from '../../action/authentication';
import { Link } from 'react-router-dom';
import logo from '../../assests/images/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    margin: 'auto',
    fontSize: '3rem',
    letterSpacing: '.2px',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
      letterSpacing: '0',
      margin: '0',
    },
  },
  toolbarMargin: {
    [theme.breakpoints.down('xl')]: {
      marginTop: '19px',
    },
    [theme.breakpoints.down('lg')]: {
      marginTop: '21px',
    },
    [theme.breakpoints.down('md')]: {
      marginTop: '19px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2px',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '18px',
    },
  },
  logo: {
    marginTop: '7.5px',
    marginBottom: '14px',

    [theme.breakpoints.down('sm')]: {
      height: '45px',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    color: 'white',
    fontSize: '1.7rem',
    opacity: 0.8,
  },
  login: {
    marginLeft: '40px',
    marginRight: '25px',
    fontSize: '2rem',
    paddingLeft: '2.2rem',
    paddingRight: '2.2rem',
    textTransform: 'none',

    [theme.breakpoints.down('md')]: {
      marginLeft: 'auto',
      marginRight: '1.5rem',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

function AdminHeader(props) {
  const classes = useStyles();
  const { logoutAction } = props;
  const { isAuthenticated } = props.cred;
  const logoutHandler = async (e) => {
    await logoutAction();
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Button component={Link} to='/' className={classes.logoContainer}>
            <img alt='ICPC Logo' src={logo} className={classes.logo} />
          </Button>
          <Typography variant='h6' className={classes.title}>
            Admin Dashboard
          </Typography>

          {!isAuthenticated ? (
            <Button
              variant='contained'
              color='secondary'
              className={classes.login}
            >
              Login
            </Button>
          ) : (
            <Button
              variant='contained'
              color='secondary'
              className={classes.login}
              onClick={logoutHandler}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = { logoutAction };
export default connect(mapStateToProps, mapDispatchToAction)(AdminHeader);
