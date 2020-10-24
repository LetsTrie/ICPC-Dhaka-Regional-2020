import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import logo from '../../assests/images/icpclogo_big.png'
import { Link } from 'react-router-dom'
import { login } from '../../action/index'
import { useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import '../../assests/css/auth.css'
import Header from '../ui/Header'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [isError, setIsError] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
      if (auth.error) {
        setIsError(auth)
        console.log('[Login]', auth)
      } else if (auth.user) {
        console.log('home redirect')
        history.push('/')
      }
  }, [auth])

  const valid = data => {
    return data == null || data == '' || data == undefined
  }

  const handleInput = e => {
    const cred = credentials
    cred[e.target.name] = e.target.value
    setCredentials(cred)
  }
  const submit = e => {
    const { email, password } = credentials
    if (!valid(email) && !valid(password)) {
      dispatch(login(credentials))
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
  return (
    <div>
        <Header />
    <div className='Login' style={{marginTop: '80px'}}>
      <div className='login-box'>
        <div className='login-logo'>
          <img src={logo} />
        </div>
        <div className='header'><p>Team Account Login</p></div>
        {
          isError ? <Alert variant='filled' severity='error'> {isError.msg} </Alert> : <div></div> 
        }
        <TextField style={textStyles} name='email'  variant='outlined' label='Team Email'
        onChange={e => handleInput(e)} 
        /> <br/>
        <TextField style={textStyles} type='password' name='password'  variant='outlined' label='Password'
        onChange={e => handleInput(e)}/>
        <p className='right'><Link style={linkStyles}>Forgot password?</Link></p>
        <Button style={{marginTop: '30px', width: '100%'}} variant='contained' onClick={submit} color='secondary'>LOGIN</Button>
        <p>Not registered yet? <Link style={linkStyles} to='/registration/online'>Register your team now!</Link></p>
      </div>
    </div>
    </div>
  )
}

export default Login