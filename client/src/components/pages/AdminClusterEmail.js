import React, { useState, useEffect } from 'react'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SendIcon from '@material-ui/icons/Send';
import Alert from '@material-ui/lab/Alert'

import { clusterEmail } from '../../action/index'
import { useSelector, useDispatch } from 'react-redux';

const AdminClusterEmail = () => {

  const [states, setStates] = useState({
    audience: '',
    subject: '',
    body: ''
  })

  const [alert, setAlert] = useState(null)
  const [disable, setDisable] = useState(false)

  const admin = useSelector(state => state.admin)
  const dispatch = useDispatch()

  useEffect(() => {
    admin.error != null && setAlert(admin)
    if (admin.error == false) {
      setStates({
        audience: '',
        subject: '',
        body: ''
      })
      setDisable(false)
    }
  }, [admin])

  const check = data => {
    return data == '' || data == null || data == undefined
  }

  const handleChanges = e => {
    let temp = {...states}
    temp[e.target.name] = e.target.value
    setStates(temp)
  }

  const onSubmit = e => {
    if (check(states.audience)) {
      setAlert({
        error: true,
        msg: 'Please select the audience'
      })
    } else if (check(states.subject)) {
      setAlert({
        error: true,
        msg: 'Please specify the subject'
      })
    } else if (check(states.body)) {
      setAlert({
        error: true,
        msg: 'Please enter the body of the email'
      })
    } else {
      setDisable(true)
      dispatch(clusterEmail(states))
    }
  }

  return (
    <div className='AdminClusterEmail'>
      <div className='top-row'>
              <div className='header'>
                <h1>Cluster Emails</h1>
              </div>
              <div className='numbers'>
              </div>
            </div>
        
      <div className='mail-box'>
      {
        alert && <Alert variant='filled' severity={ alert.error ? 'error' : 'success' }> 
          { alert.msg } 
        </Alert>
      }
      <div className='top-row'>
              <div className='header'>
                <select name='audience'
                  onChange={handleChanges} value={states.audience}
                >
                  <option value='' disabled>Select Audience</option>
                  <option value='all'>All</option>
                  <option value='team-leaders'>Team Leaders Only</option>
                </select>
              </div>
              <div className='numbers'>
                <Button color='primary' variant='contained' onClick={onSubmit}
                  disabled={disable}
                >
                  <SendIcon style={{padding: '0 10px', fontSize: 40}} /> 
                  <h3>Send</h3>
                </Button>
              </div>
            </div>
          <div className='subject'>
            <TextField style={{width: '100%'}} variant='outlined' placeholder='Subject'
              onChange={handleChanges} value={states.subject} name='subject'
            />
          </div>
          <div className='main-body'>
            <textarea rows={15} placeholder='Enter the mail body' name='body'
              onChange={handleChanges} value={states.body}
            />
          </div>
      </div>
    </div>
  )
}

export default AdminClusterEmail