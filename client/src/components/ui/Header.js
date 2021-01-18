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
import navMenu from '../../data/navbar';
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks';

import { connect } from 'react-redux';
import { logoutAction } from '../../action/authentication';

import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  drawerMargin: {
    [theme.breakpoints.down('md')]: {
      marginTop: '90px',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '75px',
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
    marginLeft: '15px',
    color: 'white',
    fontSize: '1.7rem',
    opacity: 0.8,
  },
  selectedTab: {
    color: 'white',
    opacity: 1,
  },
  login: {
    marginLeft: '33px',
    marginRight: '25px',
    fontSize: '2rem',
    paddingLeft: '2.2rem',
    paddingRight: '2.2rem',
    textTransform: 'none',
  },
  DrawerAuthBtn: {
    borderRadius: '0',
    fontSize: '2.2rem',
    textTransform: 'none',
    paddingTop: '5px',
    paddingBottom: '5px',
    marginTop: '1rem',
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
    fontSize: '1.6rem',
    padding: '1rem 1.6rem',
    opacity: 1,
    color: 'white',
  },
  drawerIcon: {
    height: '45px',
    width: '45px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: 'white',
    width: '270px',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'black',
    fontSize: '1.8rem',
    opacity: 1,
    paddingTop: '1px',
    paddingBottom: '1px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.3rem',
      letterSpacing: '.4px',
      fontFamily: 'Lato',
    },
  },

  drawerItemSelected: {
    ...theme.typography.tab,
    color: 'black',
    fontSize: '1.8rem',
    opacity: 1,
    paddingTop: '1px',
    paddingBottom: '1px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.3rem',
      fontFamily: 'Lato',
      letterSpacing: '.4px',
    },
  },
  CollapseDrawerItem: {
    ...theme.typography.tab,
    color: 'black',
    fontSize: '1.75rem',
    opacity: 1,
    fontFamily: 'Lato',
    letterSpacing: '.4px',
    paddingTop: '1px',
    paddingBottom: '1px',
  },
  CollapseDrawerItemSelected: {
    ...theme.typography.tab,
    color: 'black',
    fontSize: '1.75rem',
    opacity: 1,
    letterSpacing: '.4px',
    fontFamily: 'Lato',
    paddingTop: '1px',
    paddingBottom: '1px',
  },
  appbar: {
    [theme.breakpoints.down('md')]: {
      zIndex: theme.zIndex.modal + 1,
    },
  },
  nested: {
    paddingLeft: theme.spacing(3.5),
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

function redirectTo(url) {
  if(process.env.NODE_ENV === 'development') {
    window.open('http://localhost:5000' + url);
  } else {
    window.open(window.location.protocol + '//' + window.location.host + url);
  }
}

function BackToTop(props) {
  const { isAuthenticated, isAdmin } = props.cred;
  const { logoutAction } = props;

  const [openCollapse, setOpen] = React.useState(false);

  const handleCollapseClick = () => {
    setOpen(!openCollapse);
  };

  const modifiedNavMenu = navMenu.filter((n) => {
    if (isAuthenticated) {
      if (n.name === 'Registration') return false;
      if (isAdmin) {
        if (n.name === 'Contact Us' || n.name === 'My Profile') return false;
      }
    } else {
      if (n.name === 'My Profile') return false;
    }
    return true;
  });

  window.dispatchEvent(new CustomEvent('resize'));
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);

  // Selected Menu and SubMenu Index
  const [menuIndex, setMenuIndex] = useState(0); // selected main menu
  const [subMenuIndex, setSubMenuIndex] = useState(null); // menuId, subMenuId

  const handleMenuClick = (e, menuId) => {
    setMenuIndex(menuId);
  };

  const handleSubMenuClick = (e, menuId, subMenuId) => {
    setMenuIndex(menuId);
    setSubMenuIndex(subMenuId);
  };

  const logoutHandler = async (e) => {
    await logoutAction();
  };

  const mainMenu = modifiedNavMenu.map(({ link }, id) => ({ id, link }));

  const subMenu = modifiedNavMenu
    .map((menu, id) => {
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
    const { pathname } = window.location; // /, /gallery

    // Page refresh dile hook er value initial hoye jabe...
    // tai notun kore set korar jonno
    if (!openDrawer) {
      mainMenu.forEach(({ link, id }) => {
        if (pathname === link && menuIndex !== id) {
          setMenuIndex(id);
        }
      });

      subMenu.forEach((sm) => {
        const { menuId, subMenuId, subMenuLink } = sm;
        if (pathname === subMenuLink && menuIndex !== menuId) {
          setMenuIndex(menuId);
          setSubMenuIndex(subMenuId);
        }
      });

      // if (pathname === '/login') {
      //   setMenuIndex(2);
      // }
    }
  }, [menuIndex, subMenuIndex]);

  const selected = (id, jd) => {
    return id === menuIndex && jd === subMenuIndex;
  };

  const MenuPopupState = ({ menu, id }) => {
    const popupState = usePopupState({
      variant: 'popover',
      popupId: id,
    });
    return (
      <>
        <Tab
          key={`${menu.name}-${id}`}
          label={menu.name}
          component={menu.submenu ? undefined : Link}
          to={menu.submenu ? undefined : menu.link}
          onClick={menu.submenu ? undefined : () => setMenuIndex(id)}
          className={
            menuIndex === id
              ? `${classes.tab} ${classes.selectedTab}`
              : classes.tab
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
                key={`${menu.name}-${sm.name}-${jd}`}
                onClick={(e) => {
                  popupState.close();
                  if (sm.notPage) redirectTo(sm.external);
                  else handleSubMenuClick(e, id, jd);
                }}
                component={sm.notPage ? undefined : Link}
                to={sm.notPage ? undefined : sm.link}
                classes={{
                  root: selected(id, jd)
                    ? classes.selectedMenuItem
                    : classes.menuItem,
                }}
                selected={selected(id, jd)}
              >
                {sm.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </>
    );
  };
  // For Desktop
  const tabs = (
    <>
      <Tabs
        value={menuIndex}
        className={classes.tabContainer}
        onChange={handleMenuClick}
      >
        {/* Authorization */
        /* ============= */
        /* 1. unAuthenticated user der jonno... Authenticated hole badh */
        /* 2. only for team members... UnAuthenticated && admin hole badh */}
        {modifiedNavMenu.map((menu, id) => {
          let comp = (
            <MenuPopupState menu={menu} id={id} key={`${menu.name}-${id}`} />
          );
          let show = true;
          if (menu.unAuthenticated && isAuthenticated) {
            show = false;
          } else if (menu.teamAllowed && (!isAuthenticated || isAdmin)) {
            show = false;
          }
          return show ? comp : '';
        })}
      </Tabs>

      {/* Logout handlers */
      /* Authenticated holei hobe.. */}

      {/* {isAuthenticated ? (
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
          onClick={() => setMenuIndex(2)}
        >
          Login
        </Button>
      )} */}
    </>
  );

  const ListInDrawer = ({ menu, id }) => {
    return (
      <>
        <ListItem
          className={classes.mainDrawerMenu}
          key={`${menu.name}-${id}`}
          divider
          button
          component={menu.submenu ? undefined : Link}
          to={menu.submenu ? undefined : menu.link}
          onClick={() => {
            if (!menu.submenu) setOpenDrawer(false);
            setMenuIndex(id);
            handleCollapseClick();
          }}
          selected={menu.submenu ? false : menuIndex === id}
        >
          <ListItemText
            className={
              menuIndex === id ? classes.drawerItemSelected : classes.drawerItem
            }
            disableTypography
          >
            {menu.name}
          </ListItemText>
          {menu.submenu ? (
            menuIndex !== id ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          ) : (
            ''
          )}
        </ListItem>
        {menu.submenu ? (
          <Collapse
            in={menu.submenu && menuIndex === id}
            timeout='auto'
            unmountOnExit
          >
            <List component='div' disablePadding>
              {menu.submenu.map((sm, jd) => (
                <ListItem
                  className={classes.nested}
                  divider
                  button
                  key={`${menu.name}-${sm.name}-${jd}`}
                  component={sm.notPage ? undefined : Link}
                  to={sm.notPage ? undefined : sm.link}
                  onClick={(e) => {
                    handleCollapseClick();
                    setOpenDrawer(false);
                    if (sm.notPage) redirectTo(sm.external);
                    else handleSubMenuClick(e, id, jd);
                  }}
                  classes={{
                    root: selected(id, jd)
                      ? classes.selectedMenuItem
                      : classes.menuItem,
                  }}
                  selected={selected(id, jd)}
                >
                  <ListItemText
                    className={
                      menuIndex === id && subMenuIndex === jd
                        ? classes.CollapseDrawerItemSelected
                        : classes.CollapseDrawerItem
                    }
                    disableTypography
                  >
                    {sm.name}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Collapse>
        ) : (
          ''
        )}
      </>
    );
  };

  // For Mobile
  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.drawerMargin}></div>
        <List disablePadding>
          {modifiedNavMenu.map((menu, id) => {
            let comp = (
              <ListInDrawer menu={menu} id={id} key={`${menu.name}-${id}`} />
            );
            let show = true;
            if (menu.unAuthenticated && isAuthenticated) {
              show = false;
            } else if (menu.teamAllowed && (!isAuthenticated || isAdmin)) {
              show = false;
            }
            return show ? comp : '';
          })}
        </List>
        {/* {isAuthenticated ? (
          <Button
            variant='contained'
            color='secondary'
            className={classes.DrawerAuthBtn}
            onClick={logoutHandler}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant='contained'
            color='secondary'
            className={classes.DrawerAuthBtn}
            component={Link}
            to='/login'
            onClick={() => setMenuIndex(2)}
          >
            Login
          </Button>
        )} */}
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} style={{ color: 'white' }} />
      </IconButton>
    </>
  );

  return (
    <>
      <CssBaseline />
      <AppBar className={classes.appbar}>
        <Toolbar>
          {/* After clicking Top-left icon, It'll redirect to home.  */}
          <Button
            onClick={() => setMenuIndex(0)}
            component={Link}
            to='/'
            className={classes.logoContainer}
          >
            <img alt='ICPC' src={logo} className={classes.logo} />
          </Button>
          {matches ? drawer : tabs}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = { logoutAction };
export default connect(mapStateToProps, mapDispatchToAction)(BackToTop);
