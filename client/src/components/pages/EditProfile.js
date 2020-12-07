import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import Edit from '@material-ui/icons/Edit';

import '../../assests/css/editProfile.css';
import validate from '../../utils/UpdateValidation';
import Alert from '@material-ui/lab/Alert';
import Header from '../ui/Header';
import { updateProfile } from '../../action/index';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

const EditProfile = (props) => {
  const User = props.props;

  const addMember = (e) => {
    if (membersInfo.length < 3) {
      setMembersInfo([
        ...membersInfo,
        {
          memberName: '',
          memberYear: '',
          memberSemester: '',
        },
      ]);
    }
  };
  const deleteMember = (e, i) => {
    if (membersInfo.length > 1) {
      const mInfo = [...membersInfo];
      mInfo.splice(i, 1);
      setMembersInfo(mInfo);
      console.log(membersInfo);
    }
  };

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    coachFirstName: '',
    coachLastName: '',
    university: '',
    email: '',
    password: '',
    conPassword: '',
  });
  const [membersInfo, setMembersInfo] = useState([
    {
      memberFirstName: '',
      memberLastName: '',
      memberYear: '',
      memberSemester: '',
      memberEmail: '',
      tshirtSize: '',
      image: null,
    },
  ]);

  useEffect(() => {
    let mInfo = [...membersInfo];
    mInfo = User.membersInfo;
    setMembersInfo(mInfo);

    let tInfo = { ...teamInfo };
    tInfo = User;
    delete tInfo['membersInfo'];
    setTeamInfo(tInfo);
  }, []);

  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState(null);
  const [btnDisable, setDisable] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const submit = (e) => {
    window.scrollTo(0, 0);
    const data = {
      teamInfo,
      membersInfo,
    };
    const check = validate(data);
    setAlert(check);
    if (!check.error) {
      const team = {
        teamName: teamInfo.teamName,
        coachFirstName: teamInfo.coachFirstName,
        coachLastName: teamInfo.coachLastName,
        university: teamInfo.university,
        email: teamInfo.email,
        membersInfo,
      };
      dispatch(updateProfile(team));
      setDisable(true);
      history.push('/');
    }
  };

  const textStyles = {
    width: '100%',
    marginTop: '15px',
  };
  const linkStyles = {
    textDecoration: 'none',
    color: '#5499C7',
  };
  const iconStyles = {
    color: '#ffba60',
    fontSize: '20px',
  };
  const handleInputs = (e, i) => {
    const info = [...membersInfo];
    info[i][e.target.name] = e.target.value;
    setMembersInfo(info);
  };
  const handleTeamInfo = (e) => {
    const team = { ...teamInfo };
    team[e.target.name] = e.target.value;
    setTeamInfo(team);
  };
  const handleImageInputs = (e, i) => {
    const img = [...images];
    const info = [...membersInfo];
    img[i] = e.target.files[0];
    info[i].image = e.target.files[0].name;
    setImages(img);
    setMembersInfo(info);
  };

  return (
    <div>
      <Header />
      <div className='EditProfile'>
        <div className='logo'>
          <Edit style={iconStyles} />
          <h1>Update Profile</h1>
        </div>
        <div className='register-box'>
          <div className='colum'>
            {alert ? (
              <Alert
                severity={alert.error ? 'error' : 'success'}
                variant='filled'
              >
                {alert.msg}
              </Alert>
            ) : (
              <div></div>
            )}
            <div className='side'>
              <TextField
                style={{ width: '48%' }}
                name='teamName'
                variant='outlined'
                label='Team Name'
                onChange={(e) => handleTeamInfo(e)}
                value={teamInfo.teamName}
              />
              <TextField
                style={{ width: '48%' }}
                name='university'
                variant='outlined'
                label='University'
                onChange={(e) => handleTeamInfo(e)}
                value={teamInfo.university}
              />
            </div>{' '}
            <br />
            <div className='side'>
              <TextField
                style={{ width: '48%' }}
                name='coachFirstName'
                variant='outlined'
                label='Coach (First Name)'
                onChange={(e) => handleTeamInfo(e)}
                value={teamInfo.coachFirstName}
              />
              <TextField
                style={{ width: '48%' }}
                name='coachLastName'
                variant='outlined'
                label='Coach (Last Name)'
                onChange={(e) => handleTeamInfo(e)}
                value={teamInfo.coachLastName}
              />
            </div>{' '}
            <br />
            <div className='team-holder'>
              {membersInfo.map((member, i) => (
                <div key={uuid()}>
                  <div className='side'>
                    <h3>Participent {i + 1}</h3>
                    <DeleteIcon
                      onClick={(e) => deleteMember(e, i)}
                      style={{
                        marginTop: '10px',
                        cursor: 'pointer',
                        color: 'red',
                      }}
                    />
                  </div>
                  <div className='side'>
                    <TextField
                      style={{ width: '48%' }}
                      name='memberFirstName'
                      onChange={(e) => handleInputs(e, i)}
                      variant='outlined'
                      label='First name of the participent'
                      value={member.memberFirstName}
                    />
                    <TextField
                      style={{ width: '48%' }}
                      name='memberLastName'
                      onChange={(e) => handleInputs(e, i)}
                      variant='outlined'
                      label='Last name of the participent'
                      value={member.memberLastName}
                    />
                  </div>
                  <br />
                  <div className='side'>
                    <select
                      name='memberYear'
                      onChange={(e) => handleInputs(e, i)}
                      value={member.memberYear}
                    >
                      <option value={''}>Year</option>
                      <option value={'1st'}>1st</option>
                      <option value={'2nd'}>2nd</option>
                      <option value={'3rd'}>3rd</option>
                      <option value={'4th'}>4th</option>
                      <option value={'Masters'}>Masters</option>
                      <option value={'Others'}>Others</option>
                    </select>

                    <select
                      name='memberSemester'
                      onChange={(e) => handleInputs(e, i)}
                      value={member.memberSemester}
                    >
                      <option value={''}>Semester</option>
                      <option value={'1st'}>1st</option>
                      <option value={'2nd'}>2nd</option>
                      <option value={'3rd'}>3rd</option>
                      <option value={'4th'}>4th</option>
                    </select>
                  </div>
                  <div className='side'>
                    <TextField
                      style={{ width: '48%' }}
                      name='memberEmail'
                      onChange={(e) => handleInputs(e, i)}
                      variant='outlined'
                      label='Email address of the participent'
                      value={member.memberEmail}
                    />
                    <select
                      name='tshirtSize'
                      onChange={(e) => handleInputs(e, i)}
                      value={member.tshirtSize}
                    >
                      <option value={''}>Tshirt size</option>
                      <option value={'S'}>S</option>
                      <option value={'M'}>M</option>
                      <option value={'L'}>L</option>
                      <option value={'XL'}>XL</option>
                    </select>
                  </div>
                  <div className='side'>
                    <label className='file-input'>
                      Upload Image
                      <input
                        type='file'
                        name='image'
                        onChange={(e) => handleImageInputs(e, i)}
                      />
                    </label>
                  </div>
                  <br />
                </div>
              ))}
              <Button
                style={{ marginTop: '10px' }}
                variant='contained'
                onClick={addMember}
              >
                Add Member
              </Button>
              <br />
              <Button
                style={{ marginTop: '10px' }}
                color='secondary'
                variant='contained'
                onClick={submit}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
