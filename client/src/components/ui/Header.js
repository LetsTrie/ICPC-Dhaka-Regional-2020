import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import logo from '../../assests/images/logo.png';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from 'material-ui-popup-state/HoverMenu';
import { useMediaQuery, IconButton } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavMenu from '../../data/navbar';

import { connect } from 'react-redux';

import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

import { logoutAction } from '../../action/authentication';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
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
  selectedTab: {
    color: 'white',
    opacity: 1,
  },
  login: {
    marginLeft: '40px',
    marginRight: '25px',
    fontSize: '2rem',
    paddingLeft: '2.2rem',
    paddingRight: '2.2rem',
    textTransform: 'none',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    fontSize: '1.4rem',
    padding: '1rem 1.6rem',

    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  selectedMenuItem: {
    ...theme.typography.tab,
    fontSize: '1.2rem',
    padding: '1rem',
    paddingRight: '1.3rem',
    opacity: 1,
    color: 'white',
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.arcBlue,
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7,
  },

  drawerItemSelected: {
    opacity: 1,
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function BackToTop(props) {
  const { isAuthenticated } = props.cred;
  const { logoutAction } = props;

  window.dispatchEvent(new CustomEvent('resize'));
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0); // selected main menu
  const [selectedIndex, setSelectedIndex] = useState({}); // menuId, subMenuId

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (event, subMenuId, menuId) => {
    setSelectedIndex({ menuId, subMenuId });
    setValue(menuId);
  };

  const logoutHandler = async (e) => {
    await logoutAction();
  };

  const mainMenu = NavMenu.map(({ link }, id) => ({ id, link }));
  const subMenu = NavMenu.map((menu, id) => {
    if (menu.submenu) {
      return menu.submenu.map((subM, jd) => ({
        menuId: id,
        subMenuId: jd,
        subMenuName: subM.name,
        subMenuLink: subM.link,
      }));
    }
  })
    .filter(Boolean)
    .flat();

  useEffect(() => {
    const { pathname } = window.location;

    mainMenu.forEach(({ link, id }) => {
      if (pathname === link && value !== id) {
        setValue(id);
      }
    });

    subMenu.forEach((sm) => {
      const { menuId, subMenuId, subMenuLink } = sm;
      if (pathname === subMenuLink && value !== menuId) {
        setValue(menuId);
        setSelectedIndex({ menuId, subMenuId });
      }
    });

    if (pathname === '/login') {
      setValue(2);
    }
  }, [value]);
  const MenuPopupState = ({ menu, id }) => {
    const popupState = usePopupState({
      variant: 'popover',
      popupId: id,
    });
    return (
      <React.Fragment>
        <Tab
          key={id}
          label={menu.name}
          component={menu.submenu ? undefined : Link}
          to={menu.submenu ? undefined : menu.link}
          onClick={menu.submenu ? undefined : () => setValue(id)}
          className={
            value === id ? `${classes.tab} ${classes.selectedTab}` : classes.tab
          }
          {...bindHover(popupState)}
        />
        {menu.submenu && (
          <Menu
            {...bindMenu(popupState)}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            classes={{ paper: classes.menu }}
            elevation={0}
            keepMounted
          >
            {menu.submenu.map((sm, jd) => (
              <MenuItem
                key={`${sm.name}-${jd}`}
                onClick={(e) => {
                  popupState.close();
                  handleMenuItemClick(e, jd, id);
                }}
                component={Link}
                to={sm.link}
                classes={{
                  root:
                    id === selectedIndex.menuId &&
                    jd === selectedIndex.subMenuId
                      ? classes.selectedMenuItem
                      : classes.menuItem,
                }}
                selected={
                  id === selectedIndex.menuId && jd === selectedIndex.subMenuId
                }
              >
                {sm.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </React.Fragment>
    );
  };
  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        className={classes.tabContainer}
        onChange={handleChange}
      >
        {NavMenu.map((menu, id) => {
          let comp = '';
          if(menu.authenticated) {
            if(isAuthenticated) {
              comp = <MenuPopupState menu={menu} id={id} key={`${menu.name}-${id}`} />
            } 
          } else if(menu.unAuthenticated) {
            if(!isAuthenticated) {
              comp = <MenuPopupState menu={menu} id={id} key={`${menu.name}-${id}`} />
            }
          } else {
            comp = <MenuPopupState menu={menu} id={id} key={`${menu.name}-${id}`} />
          }
          return comp;
        })}
      </Tabs>
      {isAuthenticated ? (
        <Button
          variant='contained'
          color='secondary'
          className={classes.login}
          onClick={logoutHandler}
        >
          Log Out
        </Button>
      ) : (
        <Button
          variant='contained'
          color='secondary'
          className={classes.login}
          component={Link}
          to='/login'
          onClick={() => setValue(2)}
        >
          Login
        </Button>
      )}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Button
            onClick={() => setValue(0)}
            component={Link}
            to='/'
            className={classes.logoContainer}
          >
            <img alt='ICPC Logo' src={logo} className={classes.logo} />
          </Button>
          {matches ? null : tabs}
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
      {children}
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
      <div className={classes.toolbarMargin}></div>
    </React.Fragment>
  );
}

// const drawer = (
//   <React.Fragment>
//     <SwipeableDrawer
//       disableBackdropTransition={!iOS}
//       disableDiscovery={iOS}
//       open={openDrawer}
//       onClose={() => setOpenDrawer(false)}
//       onOpen={() => setOpenDrawer(true)}
//       classes={{ paper: classes.drawer }}
//     >
//       <List disablePadding>
//         <ListItem
//           divider
//           button
//           component={Link}
//           to='/'
//           onClick={() => {
//             setOpenDrawer(false);
//             setValue(0);
//           }}
//           selected={value === 0}
//         >
//           <ListItemText
//             className={
//               value === 0
//                 ? [classes.drawerItem, classes.drawerItemSelected]
//                 : classes.drawerItem
//             }
//             disableTypography
//           >
//             Home
//           </ListItemText>
//         </ListItem>
//         <ListItem
//           divider
//           button
//           component={Link}
//           to='/gallery'
//           onClick={() => {
//             setOpenDrawer(false);
//             setValue(1);
//           }}
//           selected={value === 1}
//         >
//           <ListItemText
//             className={
//               value === 1
//                 ? [classes.drawerItem, classes.drawerItemSelected]
//                 : classes.drawerItem
//             }
//             disableTypography
//           >
//             Gallery
//           </ListItemText>
//         </ListItem>
//       </List>
//     </SwipeableDrawer>
//     <IconButton
//       className={classes.drawerIconContainer}
//       onClick={() => setOpenDrawer(!openDrawer)}
//       disableRipple
//     >
//       <MenuIcon className={classes.drawerIcon} />
//     </IconButton>
//   </React.Fragment>
// );

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = { logoutAction };
export default connect(mapStateToProps, mapDispatchToAction)(BackToTop);
