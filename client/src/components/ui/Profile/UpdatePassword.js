import React, { useState, useEffect } from 'react';
import '../../../assests/css/profile.css';
import Info from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import CustomTextField from '../CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import useFormFields from '../../HandleForms';
import Button from '@material-ui/core/Button';
import Loader from '../Loader';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { UPDATE_TEAM_PROFILE } from '../../../action/types';

const useStyles = makeStyles({
  TextField: {
    width: '100%',
    marginBottom: '1.7rem',
  },
  submitButton: {
    marginTop: '1rem',
    fontSize: '1.7rem',
    padding: '1rem',
    paddingLeft: '2.2rem',
    paddingRight: '2.2rem',
    textTransform: 'none',
  },
});

export const Profile = (props) => {
  const { isAuthenticated, teamInfo, accessToken } = props.cred;
  const { isLoading, setIsLoading } = props;
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();

  // MUI Classes
  const classes = useStyles();

  // Initial State
  let initialState = {
    previousPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const { formFields, createChangeHandler, resetForm } = useFormFields(
    initialState
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.newPassword !== formFields.confirmPassword) {
      setError('Password is not matching !');
      return;
    }
    setIsLoading(true);
    let originalUrl = '/api/v1/auth/update-password';
    const resJson = await fetch(originalUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formFields),
    });
    const response = await resJson.json();
    if (response.success) {
      setError(null);
      setSuccess('Your password is successfully changed!');
      dispatch({
        type: UPDATE_TEAM_PROFILE,
        team: response.team,
      });
      resetForm();
    } else {
      setSuccess(null);
      setError(response.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {}, [isLoading, error, success]);

  return (
    <>
      <div className='info-container'>
        <div className='section-header'>
          <Info style={{ fontSize: 30, color: 'ffba60' }} />
          <h4>Update Password</h4>
        </div>
        <div className='section-body'>
          <div className='section-body-fields'>
            {success && (
              <div style={{ paddingBottom: '2.3rem' }}>
                <Alert variant='filled' severity='success'>
                  {success}
                </Alert>
              </div>
            )}
            {error && (
              <div style={{ paddingBottom: '2.3rem' }}>
                <Alert variant='filled' severity='error'>
                  {error}
                </Alert>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className='fullWidthField'>
                <CustomTextField
                  className={classes.TextField}
                  name='previousPassword'
                  label='Previous password'
                  onChange={createChangeHandler('previousPassword')}
                  value={formFields.previousPassword}
                  type='password'
                  required={true}
                />
              </div>
              <div className='fullWidthField'>
                <CustomTextField
                  className={classes.TextField}
                  name='newPassword'
                  label='New password'
                  onChange={createChangeHandler('newPassword')}
                  value={formFields.newPassword}
                  type='password'
                  required={true}
                  inputProps={{ minLength: 6 }}
                />
              </div>
              <div className='fullWidthField'>
                <CustomTextField
                  className={classes.TextField}
                  name='confirmPassword'
                  label='Confirm Password'
                  onChange={createChangeHandler('confirmPassword')}
                  value={formFields.confirmPassword}
                  type='password'
                  required={true}
                />
              </div>

              <div className='section-body-fields-submit'>
                <Button
                  type='submit'
                  variant='contained'
                  color='secondary'
                  className={classes.submitButton}
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Profile);
