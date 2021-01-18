import React, { useEffect, useState } from 'react';
import Header from '../ui/Header';
import '../../assests/css/admin.css';
import { makeStyles } from '@material-ui/core/styles';
import { getAllUsers } from '../../action/index';
import { useDispatch, useSelector } from 'react-redux';
import UserList from '../ui/UserList';
import { v4 as uuid } from 'uuid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Users from '@material-ui/icons/Group';
import Gallery from '@material-ui/icons/Image';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ListSubheader from '@material-ui/core/ListSubheader';
import Chip from '@material-ui/core/Chip';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';

const AdminTeamList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.admin);
  const users = state.users;
  const participants = state.participantCount;
  const history = useHistory();
  useEffect(() => {
    if (state.error == null) {
      dispatch(getAllUsers());
    } else if (state.error == true) {
      history.push('/admin/login');
    }
  }, [state]);

  return (
    <div>
      <div className='top-row'>
        <div className='header'>
          <h1>Registered Teams</h1>
        </div>
        <div className='numbers'>
          <Chip
            label={users.length + ' Teams'}
            color='primary'
            icon={<Users />}
            clickable
          />
          <Chip
            label={participants + ' Participants'}
            color='secondary'
            icon={<AccessibilityNewIcon />}
            clickable
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Team Name</TableCell>
              <TableCell align='right'>Coach Name</TableCell>
              <TableCell align='right'>Team Email</TableCell>
              <TableCell align='right'>University</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((team) => (
              <UserList key={team.teamName} team={team} key={uuid()} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminTeamList;
