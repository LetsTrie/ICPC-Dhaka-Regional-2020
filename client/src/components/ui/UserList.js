import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse'
import Box from '@material-ui/core/Box' 
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import IconButton from '@material-ui/core/IconButton'

import { makeStyles } from '@material-ui/core/styles';

const UserList = (props) => {
  const team = props.team
  const [open, setOpen] = useState(false)

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  const classes = useRowStyles()
  return (
    <>
      <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell align='left'> { team.teamName } </TableCell>
                    <TableCell align="right">
                       { team.coachFirstName + ' ' + team.coachLastName } 
                    </TableCell>
                  <TableCell align="right"> { team.email } </TableCell>
                <TableCell align="right"> { team.university } </TableCell>
              </TableRow>

              <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                      <h2>Members information</h2>
                    <Table  aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell align="right">Academic</TableCell>
                          <TableCell align="right">Tshirt</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                              team.membersInfo.map(member => (
                                <TableRow key={ uuid() }>
                                  <TableCell component="th" scope="row">
                                    { member.memberFirstName + ' ' + member.memberLastName}
                                  </TableCell>
                                  <TableCell>{ member.memberEmail }</TableCell>
                                  <TableCell align="right">
                                    { member.memberYear + '/' + member.memberSemester }
                                  </TableCell>
                                  <TableCell align="right">
                                    { member.tshirtSize }
                                  </TableCell>
                                </TableRow>
                              ))
                        }
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
              </TableRow>
    </>
  )
}

export default UserList