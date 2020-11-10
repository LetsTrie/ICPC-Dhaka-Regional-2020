import React, { useEffect, useState } from 'react'
import Header from '../ui/Header'
import '../../assests/css/admin.css'
import { makeStyles } from '@material-ui/core/styles';
import { getAllUsers, setUser, resetStates } from '../../action/index'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'

import AdminTeamList from '../pages/AdminTeamList'
import AdminGallery from '../pages/AdminGallery'
import AdminNavControls from '../pages/AdminNavControls'
import AdminClusterEmail from '../pages/AdminClusterEmail'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader'
import Chip from '@material-ui/core/Chip'
import LinearProgress from '@material-ui/core/LinearProgress'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box' 

import Users from '@material-ui/icons/Group';
import Gallery from '@material-ui/icons/Image';
import SettingsIcon from '@material-ui/icons/Settings';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import EmailIcon from '@material-ui/icons/Email';

const Admin = () => {
  const admin = useSelector(state => state.profile)
  useEffect(() => {
    if (admin.error == null) {
      dispatch(setUser())
    } else {
      if (admin.error == true) {
        console.log(admin)
        history.push('/admin/login')
      } else if (!admin.user.hasOwnProperty('name')) {
        history.push('/admin/denied')
      } else {
        // dispatch(resetStates('RESET_PROFILE'))
        setAllowed(true)
      }
    }
  }, [admin])

  const dispatch = useDispatch()
  const history = useHistory()
  const [active, setActive] = useState(1)
  const [allowed, setAllowed] = useState(false)

  const SelectDisplay = () => {
    if (active == 1) return <AdminTeamList />
    else if (active == 2) return <AdminGallery />
    else if (active == 3) return <AdminNavControls />
    else if (active) return <AdminClusterEmail />
  }

  return (
    <div>
      <Header />
      {
        !allowed ? <LinearProgress /> : 
        <div className='Admin'>
        <div className='container'>
          <div className='left'>
          <List component="nav" aria-label="main mailbox folders"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                    <div className='header'>
                      <h3>Admin Panel</h3>
                    </div>
              </ListSubheader>
            }
          >
        <ListItem onClick={() => { setActive(1) }} className={ active == 1 && 'active' } button>
          <ListItemIcon>
            <Users />
          </ListItemIcon>
          <ListItemText primary="Teams" />
        </ListItem>
        <ListItem onClick={() => { setActive(2) }} className={ active == 2 && 'active' } button>
          <ListItemIcon>
            <Gallery />
          </ListItemIcon>
          <ListItemText primary="Gallery" />
        </ListItem>
        <ListItem onClick={() => { setActive(3) }} className={ active == 3 && 'active' } button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Navbar Controls" />
        </ListItem>
        <ListItem onClick={() => { setActive(4) }} className={ active == 4 && 'active' } button>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Cluster Email" />
        </ListItem>
      </List>
          </div>
          <div className='right'>
            
           <SelectDisplay />
            
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Admin