import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Delete from '@material-ui/icons/Delete'

import { makeStyles } from '@material-ui/core/styles';
import navbarData from '../../data/demoNavbar'
import { adminUploadPDF, adminUpdateSubmenu, getNavbar } from '../../action/index'

const AdminNavControls = () => {
  const contestInfo = navbarData[3].submenu
  const dispatch = useDispatch()
  const state = useSelector(state => state.user)
  
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  const classes = useStyles()
  const inputStyles = {
    width: '100%'
  }

  const [states, setStates] = useState([])
  const [saveBtn, setSaveBtn] = useState(false)

  useEffect(() => {
    
    let temp = [...states]
    temp = contestInfo
    setStates(temp)
  }, [state])

  const handleChange = (e, i) => {
    setSaveBtn(true)
    let temp = [...states]
    temp[i][e.target.name] = e.target.value
    setStates(temp)
  }

const saveChanges = e => {
  setSaveBtn(false)
  const data = {
    index: 3,
    body: states
  }
  dispatch(adminUpdateSubmenu(data))
}

const pdfUpload = (e, i) => {
  let fileName = states[i].link.split('/')
  fileName = fileName[fileName.length - 1]
  let file = e.target.files[0]
  let formData = new FormData()
  formData.append('pdf', file, fileName)
  dispatch(adminUploadPDF(formData))
}

const addRow = e => {
  const row = {
    name: '',
    link: '',
    redirect: 'url'
  }
  let temp = [...states]
  temp.push(row)
  setStates(temp)
}

const deleteRow = (e, i) => {
  let temp = [...states]
  temp.splice(i, 1)
  setStates(temp)
}

  return (
    <div>
      <div className='top-row'>
              <div className='header'>
                <h1>Submenu Customization</h1>
              </div>
              <div className='numbers'>
                  <Button color='primary' variant='contained' disabled={!saveBtn} onClick={saveChanges}
                    id='save-btn'
                  >Save Changes</Button>
                  <Button style={{marginLeft: '10px'}} color='secondary' variant='contained'
                    onClick={addRow}
                  >Add Row</Button>
              </div>
            </div>
          <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Redirect</TableCell>
            <TableCell align="right">Input</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            states.map((row, i) => (
              <TableRow key={ uuid() }>
                <TableCell component="th" scope="row">
                  <TextField style={inputStyles} variant='outlined' value={row.name} 
                    onChange={(e) => handleChange(e, i)} 
                    name='name'
                  />
                </TableCell>
                <TableCell align="right">
                  <select value={row.redirect}
                  name='redirect'
                  onChange={(e) => handleChange(e, i)}
                  >
                      <option value='url'>URL</option>
                      <option value='pdf'>PDF</option>
                    </select>  
                </TableCell>
                <TableCell align='right'>
                  {
                    row.redirect == 'pdf' ? <input type='file' onChange={e => pdfUpload(e, i)}/> :
                    <TextField style={inputStyles} variant='outlined'
                    onChange={(e) => handleChange(e, i)}
                    placeholder='Enter the redirect URL'
                  />
                  }
                </TableCell>
                <TableCell align='right'>
                  <Delete color='primary' style={{ fontSize: 20, cursor: 'pointer' }} 
                    onClick={e => deleteRow(e, i)}/>
                </TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default AdminNavControls