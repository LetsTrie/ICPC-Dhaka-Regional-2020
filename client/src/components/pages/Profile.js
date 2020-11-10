import React, { useState, useEffect } from 'react'
import '../../assests/css/profile.css'
import Header from '../ui/Header'
import { v4 as uuid } from 'uuid'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import LinearProgress from '@material-ui/core/LinearProgress'
import EditProfile from './EditProfile'

import gravatar from '../../assests/images/gravatar.png'
import userImg from '../../assests/images/gallery1.jpg'
import MailOutline from '@material-ui/icons/MailOutline';
import LockOpenOutlined from '@material-ui/icons/LockOpenOutlined';
import Edit from '@material-ui/icons/Edit'
import Info from '@material-ui/icons/Info'
import People from '@material-ui/icons/People'
import { useMediaQuery } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileError, setUser, updatePassword, updateEmail } from '../../action/index'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const avatarStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5)
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}))

export const Profile = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [User, setCurrentUser] = useState('empty')
  const [members, setMembers] = useState([])
  const [editMode, setEditMode] = useState(false)

  const auth = useSelector(state => state.auth.user)
  const profileObject = useSelector(state => state.profile)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      dispatch(setProfileError())
      history.push('/')
      return
    }

    if (profileObject.user) {
      setCurrentUser(profileObject.user)
      setMembers(profileObject.user.membersInfo)
    } else {
      dispatch(setUser())
    }
  }, [profileObject])

  useEffect(() => {
    if (profileObject.error) {
      setAlert(profileObject.msg)
    }
  }, [profileObject])

  const classes = useStyles()
  const avatarClasses = avatarStyles()

  const mobileDevice = useMediaQuery('(min-width: 900px)')

  const [changeEmail, setChangeEmail] = useState(false)
  const [changePassword, setChangePassword] = useState(false)

  const showChangeEmail = () => {
    setChangeEmail(!changeEmail);
  }
  const showChangePassword = () => {
    setChangePassword(!changePassword);
  }

  const [alert, setAlert] = useState(null)

  const [email, setEmail] = useState('')
  const handleEmailChange = e => {
    let em = email
    em = e.target.value
    setEmail(em)
  }
  const saveEmail = e => {
    dispatch(updateEmail({email: email}))
  }

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const handlePasswordChange = e => {
    const pass = {...passwords}
    pass[e.target.name] = e.target.value
    setPasswords(pass)
  }
  const savePassword = e => {
    dispatch(updatePassword(passwords))
  }

  return (
    <div className='Profile'>
      <Header />
    {
      User == 'empty' ? <div style={{height: '100vh'}}>  <LinearProgress /> </div> : (
        <div className='contentWrapper'>
        <div className='container'>
          <div className='left'>
          <List component='nav' aria-label="main mailbox folders">
                <ListItem >
                    <Avatar>
                        <img src={gravatar} />
                    </Avatar>
                      <div className='team-name'>
                          <h3>{ User.teamName }</h3>
                          <p>{ User.university }</p>
                      </div>
                  </ListItem>
              </List>

            <Divider />

            <List component='nav' aria-label="main mailbox folders">
            <ListItem button onClick={() => {setEditMode(!editMode)}} >
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Edit Profile" />
                  </ListItem>
                <ListItem button onClick={showChangeEmail} >
                    <ListItemIcon>
                        <MailOutline />
                    </ListItemIcon>
                    <ListItemText primary="Change Team Email" />
                  </ListItem>
                  <Collapse in={changeEmail} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <div className='hidden-list-item'>
                          <TextField style={{width: '100%', padding: '10px 0'}} label="New Email" name='newEmail' onChange={handleEmailChange}/>
                          <br />
                          <Button variant='contained' onClick={saveEmail}> Save </Button>
                        </div>
                      </ListItem>
                    </List>
                  </Collapse>
                  <ListItem button>
                    <ListItemIcon>
                      <LockOpenOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Change Password" onClick={showChangePassword}/>
                  </ListItem>
                  <Collapse in={changePassword} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button className={classes.nested}>
                        <div className='hidden-list-item'>
                          <TextField style={{width: '100%', padding: '10px 0'}} label="Current password" name='currentPassword'
                          onChange={handlePasswordChange}/>
                          <TextField style={{width: '100%', padding: '10px 0'}} label="New password" name='newPassword'
                          onChange={handlePasswordChange}/>
                          <TextField style={{width: '100%', padding: '10px 0'}} label="Confirm new password" name='confirmNewPassword'
                          onChange={handlePasswordChange}/>
                          <br />
                          <Button variant='contained' onClick={savePassword}> Save </Button>
                        </div>
                      </ListItem>
                    </List>
                  </Collapse>
              </List>
          </div>
          {
            editMode ? 
            <div className='right'>
              <EditProfile props={User} />
            </div> : 
            (
              <div className='right'>
            <div className='info-container'>
              <div className='section-header'>
                <Info style={{fontSize: 22, color: 'ffba60'}} />
                <h4>About the team</h4>
              </div>
              <div className='section-body'>
                <div className='row'>
                  <div className='field'>
                    <div className='field-name'>
                      Team Name
                    </div>
                    <div className='field-value'>
                      { User.teamName }
                    </div>
                  </div>

                  <div className='field'>
                    <div className='field-name'>
                      Coach Name
                    </div>
                    <div className='field-value'>
                      { User.coachFirstName + ' ' + User.coachLastName }
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='field'>
                    <div className='field-name'>
                      University
                    </div>
                    <div className='field-value'>
                      { User.university }
                    </div>
                  </div>

                  <div className='field'>
                    <div className='field-name'>
                      Team Email
                    </div>
                    <div className='field-value'>
                      { User.email }
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className='section-header'>
                <People style={{fontSize: 22, color: 'ffba60'}} />
                <h4>Team Members</h4>
              </div>
              <div className='section-body'>
                {
                 User.membersInfo.map(member => (
                    <div className='each-user' key={ uuid() }>
                      <div className='image'>
                        <Avatar src={userImg} className={
                          mobileDevice ? avatarClasses.large : avatarClasses.small
                          } />
                      </div>
                    <div className='texts'>
                      <div className='name'>{member.memberFirstName + ' ' + member.memberLastName}</div>
                      <div className='about'>
                        {
                          member.memberEmail 
                        }
                      </div>
                    </div>
                  </div>
                  ))
                }
              </div>
            </div>
          </div>
            )
          }
        </div>
      </div>
      )
    }
    </div>
  )
}

export default Profile
