import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { contactUsAction } from '../../../action/contactUs';
import { CONTACT_INIT } from '../../../action/types';
import '../../../assests/css/contact.css';
import useFormFields from '../../HandleForms';
import Header from '../../ui/Header';
import Loader from '../../ui/Loader';
import AdminHeader from '../../ui/AdminHeader'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import Autocomplete from 'react-autocomplete'
import Autosuggest from 'react-autosuggest'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ContactUs(props) {
  const classes = useStyles();

  // Initial State
const [state, setState] = useState({
  teams: '',
  subject: '',
  body: ''
})

const [teamName, setTeamName] = useState('')
const [suggestions, setSuggestions] = useState([])
const [singleTeam, setSingleTeam] = useState(true)

// const countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland"]

const [alert, setAlert] = useState({
  visible: false,
  msg: ''
})

const [Teams, setTeams] = useState(null)

useEffect(() => {
  if (Teams == null) {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    }
    axios.get('/api/v1/admin/getTeams', config).then(res => {
      const { teams } = res.data
      setTeams(teams)
    })
  } 
}, [])

  // Dispatch
const dispatch = useDispatch();

const handleChanges = e => {
  let temp = {...state}
  temp[e.target.name] = e.target.value
  setState(temp)
} 

const handleSubmit = async e => {
  e.preventDefault()

  let temp = { ...alert }
  temp.visible = true
  temp.msg = 'Email sending in progress. Please wait...'
  setAlert(temp)

  if (state.teams == 'Single team') {
    state['teamName'] = teamName
  }
  console.log(state)
  const headers = { 'Content-Type': 'application/json' }
  const res = await axios.post('/api/v1/admin/email', { data: state }, headers)

  if (res.data.success) {
    let temp = {...state}
    temp = {
      teams: '',
      teamName: '',
      subject: '',
      body: ''
    }

    let tempAlert = { ...alert }
    tempAlert.visible = true
    tempAlert.msg = res.data.msg
    setAlert(tempAlert)

    setState(temp)
    setTimeout(() => {
      tempAlert = { ...alert }
      // tempAlert.visible = false
      setAlert(tempAlert)
    }, 3000)
  }
}

useEffect(() => {
  if (state.teams == 'Single team') {
    setSingleTeam(true)
  } else {
    setSingleTeam(false)
  }
}, [state])

  return (
    <div>
      <div className="contact">
        <div className="contact__nav">
          <AdminHeader />
        </div>

        <div className="contact__header">
          <h1> Emails</h1>
        </div>

        <section>
          <div className="EmailBox">
            <div className='EmailPalette'>
              <div className='EmailContents'>

              <form onSubmit={handleSubmit}>
              {
                alert.visible && 
                  <Alert severity="success" style={{marginTop: '1.2rem'}}>
                    Email sent successfully. 
                </Alert>
                
              }
              <div className='flex-parent'>
                <div className='flex-child'>
                  <div className='title'><h3>Select teams</h3></div>
                  <div className='select-box'>
                    <select onChange={handleChanges} name='teams' value={state.teams} required>
                      <option value='' disabled > Select team</option>
                      <option value='All teams'>All teams</option>
                      <option value='Unpaid teams'>Unpaid teams</option>
                      <option value='Paid teams'>Paid teams</option>
                      <option value='Single team'>Single team</option>
                    </select>
                  </div>
                </div>

                <div className='flex-child'>
                  {/* <div className='title'><h3>Select receipents</h3></div>
                  <div className='select-box'>
                    <select name='receipents' onChange={handleChanges} value={state.receipents} required>
                    <option value='' disabled > Select receipents</option>
                      <option value='All members'>All members</option>
                      <option value='Coaches only'>Coaches only</option>
                      <option value='Members only'>Members only</option>
                    </select>
                  </div> */}

{
                singleTeam && Teams != null ? (<>
                  <div className='title'><h3>Select team name</h3></div>
                  <div className='select-box'>
                  <Autosuggest 
                    inputProps={{
                      className: 'auto-suggest',
                      placeholder: 'Type team name',
                      autoComplete: 'junk-value',
                      name: 'teamName',
                      value: teamName,
                      onChange: ( e, {newValue} ) => {
						  setTeamName(newValue)
					  }
					}}
					onSuggestionsFetchRequested = {({ value }) => {
						if (!value) {
							setSuggestions([])
							return
						}
						setSuggestions(Teams.map(team => team.Team_Name).filter(team => team.startsWith(value)))
					}}
					onSuggestionsClearRequested = {() => {
						setSuggestions([])
					}}
                    renderSuggestion={ suggestion => ( <div>{suggestion}</div> )}
                    getSuggestionValue = { suggestion => suggestion }
                    suggestions={suggestions}
                  />

                  </div></>) : <div></div>
              }

                </div>
              </div>

              <div className='single-parent'>

                <div className='single-child'>
                  {/* <div className='title'><h3>Subject</h3></div> */}
                  <div className='text-box'><TextField className='TextField' label='Subject' name='subject' onChange={handleChanges} value={state.subject} required/></div>
                </div>
                
              </div>

              <div className='single-parent'>

                <div className='single-child'>
                  {/* <div className='title'><h3>Subject</h3></div> */}
                  <div style={{fontSize: '12px', color: '#333', padding: '7.5px'}}>{`Use <team> and <name> as placeholders`}</div>
                  <div className='text-box'><textarea rows='10' name='body' onChange={handleChanges} value={state.body} required /></div>
                </div>
                
              </div>

              <div className="submitButton text-center">
                    <button type="submit">Submit</button>
              </div>

              </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contact: state.contactUsReducer,
});

const mapDispatchToAction = { contactUsAction };
export default connect(mapStateToProps, mapDispatchToAction)(ContactUs);
