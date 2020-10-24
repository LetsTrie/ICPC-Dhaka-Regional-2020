import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import DeleteIcon from '@material-ui/icons/Delete'
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Link, useHistory } from 'react-router-dom'

import '../../assests/css/editProfile.css'
import logo from '../../assests/images/icpc_logo.png'
import validate from '../../utils/UpdateValidation'
import Alert from '../ui/Alert'
import Header from '../ui/Header'
import { updateProfile } from '../../action/index'
import { useDispatch, useSelector } from 'react-redux'
import { Fade } from '@material-ui/core'

const EditProfile = (props) => {
const User = props.location.user
const auth = useSelector(state => state.auth)

const addMember = e => {
  if (membersInfo.length < 3) {
    setMembersInfo([...membersInfo,  {
      memberName: '',
      memberYear: '',
      memberSemester: ''
    }])
  }
}
const deleteMember = (e, i) => {
if (membersInfo.length > 1) {
  const mInfo = [...membersInfo]
  mInfo.splice(i, 1)
  setMembersInfo(mInfo)
  console.log(membersInfo)
}
}

const [teamInfo, setTeamInfo] = useState({
  teamName: '',
  coachName: '',
  university: '',
  email: '',
  password: '',
  conPassword: ''
})
const [membersInfo, setMembersInfo] = useState([
  {
    memberName: '',
    memberYear: '',
    memberSemester: '',
    tshirtSize: '',
    image: null
  }
])

useEffect(() => {
  let mInfo = [...membersInfo]
  mInfo = User.membersInfo
  setMembersInfo(mInfo)

  let tInfo = {...teamInfo}
  tInfo = User
  delete tInfo['membersInfo']
  setTeamInfo(tInfo)
}, [])

const [images, setImages] = useState([ ])
const [alert, setAlert] = useState(null)
const [btnDisable, setDisable] = useState(false)
const history = useHistory()
const dispatch = useDispatch()
const submit = (e) => {
  console.log(membersInfo)
  const data = {
    teamInfo,
    membersInfo
  }
  console.log(membersInfo)
  const check = validate(data)
  setAlert(check)
  if (!check.error) {
    const team = {
      teamName: teamInfo.teamName,
      coachName: teamInfo.coachName,
      university: teamInfo.university,
      email: teamInfo.email,
      membersInfo,
  }
  console.log(team)
  dispatch(updateProfile(team))
  setDisable(true) 
  history.push('/')
  }
}
const textStyles = {
  width: '100%',
  marginTop: '15px'
} 
 const linkStyles = {
  textDecoration: 'none',
  color: '#5499C7'
}
const handleInputs = (e, i) => {
  const info = [...membersInfo]
  info[i][e.target.name] = e.target.value
  setMembersInfo(info)
}
const handleTeamInfo = (e) => {
  const team = {...teamInfo}
  team[e.target.name] = e.target.value
  setTeamInfo(team)
}
const handleImageInputs = (e, i) => {
  const img = [...images]
  const info = [...membersInfo]
  img[i] = e.target.files[0]
  info[i].image = e.target.files[0].name
  setImages(img)
  setMembersInfo(info)
}

  return (
      <div>
        <Header />
            <div className='EditProfile'>
      <div className='logo'>
        <h1 style={{textAlign: 'center'}}>Update Profile</h1>
      </div>
      <div className='register-box'>
        <div className='colum left'> 
      {
        alert ? <Alert reason={alert.error} msg={alert.msg} /> : <div></div>
      }
      <div className='side'>
          <TextField style={{width: '48%'}} name='teamName'  variant='outlined' label='Team Name'
          onChange={e => handleTeamInfo(e)} 
          value={teamInfo.teamName}
          />
          <TextField style={{width: '48%'}} name='coachName'  variant='outlined' label='Coach Name'
          onChange={e => handleTeamInfo(e)}
          value={teamInfo.coachName}
          />
        </div> <br />
      <div className='side'>
          <TextField style={{width: '48%'}} name='university' variant='outlined' label='University'
          onChange={e => handleTeamInfo(e)}
          value={teamInfo.university}
          / >
      </div>
      <div className='team-holder'>
      {
        membersInfo.map((member, i) => (
        <div>
          <div className='side'>
              <h3>Participent {i+1}</h3> 
              <DeleteIcon onClick={e => deleteMember(e, i)} style={{marginTop: '10px', cursor: 'pointer', color: 'red'}} />
          </div>
          <TextField style={textStyles} name='memberName' onChange={e => handleInputs(e, i)} variant='outlined' label='Name of the participent'
          value={member.memberName} /> <br />
          <div className='side'>
              <TextField type='number' name='memberYear' style={{width: '48%'}}  
              onChange={e => handleInputs(e, i)}
              variant='outlined' label='Year'
              value={member.memberYear} /> 
              <TextField type='number' style={{width: '48%'}} name='memberSemester' 
              onChange={e => handleInputs(e, i)}
              variant='outlined' label='Semester'
              value={member.memberSemester} />
          </div>
          <div className='side'>
              <select name='tshirtSize' onChange={e => handleInputs(e, i)}
              value={member.tshirtSize}>
                <option value={''}>Tshirt size</option>
                <option value={'S'}>S</option>
                <option value={'M'}>M</option>
                <option value={'L'}>L</option>
                <option value={'XL'}>XL</option>
              </select>
              <label className='file-input'>
              Upload Image
                  <input type='file' name='image' onChange={e => handleImageInputs(e, i)} />
              </label>
          </div>
           <br />
          </div>
        )
        )
      }
      <Button style={{marginTop: '10px'}} variant='contained' onClick={addMember}>Add Member</Button>
      <br />
      <Button style={{marginTop: '10px'}} color='secondary' variant='contained' onClick={submit}>Save Changes</Button>
      </div>
        </div>      
      </div>
     </div> 
      </div>
  )
} 

export default EditProfile
