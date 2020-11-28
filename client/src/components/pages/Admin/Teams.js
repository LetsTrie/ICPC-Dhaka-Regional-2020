import React, { useState, useEffect } from 'react';
import Header from '../../ui/AdminHeader';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../ui/Loader';

import '../../../assests/css/adminTeams.css';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Avatar from '@material-ui/core/Avatar'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import axios from 'axios';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const SingleRow = ({ T }) => {
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const avatarClass = useStyles()

  return (
    <>
      <TableRow key={T.name} className={classes.root}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component='th' scope='row'>
            {T.team}
          </TableCell>
          <TableCell align='right'>{T.university}</TableCell>
          <TableCell align='right'>
            {T.coach.firstname + ' ' + T.coach.lastname}
          </TableCell>
          <TableCell align='right'>{T.coach.email}</TableCell>
          <TableCell align='right'>{T.createdAt}</TableCell>
        </TableRow>
        <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
          <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Coach
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Affiliation</TableCell>
                    <TableCell align='right'>Designation</TableCell>
                    <TableCell align='right'>Email</TableCell>
                    <TableCell align='right'>Tshirt Size</TableCell>
                    <TableCell align='right'>Picture</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableCell>
                    {T.coach.firstname + ' ' + T.coach.lastname}
                  </TableCell>
                  <TableCell align='right'>{T.coach.affiliation}</TableCell>
                  <TableCell align='right'>{T.coach.designation}</TableCell>
                  <TableCell align='right'>{T.coach.email}</TableCell>
                  <TableCell align='right'>{T.coach.tshirtSize}</TableCell>
                  <TableCell align='right'>
                                <div className={avatarClass.root}>
                                    <Avatar alt='Participant image' src={T.coach.dp} />
                                </div>
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
            <Box margin={1}>
              <Typography variant='h6' gutterBottom component='div'>
                Participants
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Affiliation</TableCell>
                    <TableCell align='right'>Semester/Year</TableCell>
                    <TableCell align='right'>Tshirt Size</TableCell>
                    <TableCell align='right'>Picture</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {T.participants.map(member => (
                    <TableRow key={member._id}>
                      <TableCell component='th' scope='row'>
                        {member.firstname + member.lastname}
                      </TableCell>
                      <TableCell>{member.affiliation}</TableCell>
                      <TableCell align='right'>{member.semester + ', ' + member.year}</TableCell>
                      <TableCell align='right'>
                        {member.tshirtSize}
                      </TableCell>
                      <TableCell align='right'>
                        <div className={avatarClass.root}>
                          <p style={{textAlign: 'right'}}>
                            <Avatar alt='Participant image' src={member.dp} />
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const Rows = (props) => {
  const { rows, page, rowsPerPage, emptyRows } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  console.log(rows);
  return (
    <>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((T) => (
        <SingleRow T={T} />
      ))}
    
    </>
  );
};

const Teams = (props) => {
  const { accessToken } = props.cred;
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, teams.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const getTeamInfo = async () => {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data: res } = await axios.get('/api/v1/admin/teams', {
        headers,
      });
      setTeams(res.teams);
      setIsLoading(false);
    };
    try {
      getTeamInfo();
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('team is loading');
    console.log(isLoading);
  }, [isLoading]);

  return (
    <div className='registeredTeamsWrapper'>
      <Header />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='registeredTeams__header'>
            <h1> Registered Teams </h1>
          </div>
          <div className='registeredTeams__table'>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='collapsible table'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Team name</TableCell>
                    <TableCell align='right'>University</TableCell>
                    <TableCell align='right'>Coach</TableCell>
                    <TableCell align='right'>Email (Coach)</TableCell>
                    <TableCell align='right'>Registration Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Rows
                    rows={teams}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    emptyRows={emptyRows}
                  />
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: 'All', value: -1 },
                      ]}
                      colSpan={4}
                      count={teams.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                      }}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Teams);