import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/css/adminTeams.css';
import Header from '../ui/Header';
import Loader from '../ui/Loader';
import LinearProgressWithLabel from '../ui/ProgressBar';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { id: 'Serial', label: 'Serial', minWidth: 100 },
  { id: 'Team_Name', label: 'Team', minWidth: 170 },
  {
    id: 'Country',
    label: 'Country',
    minWidth: 170,
  },
  {
    id: 'University',
    label: 'Institution',
    minWidth: 170,
  },
  {
    id: 'Coach',
    label: 'Coach',
    minWidth: 170,
  },
  {
    id: 'payment_status',
    label: 'Payment Status',
    minWidth: 170,
  },
];

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  root: {
    width: '100%',
    marginTop: 0,
    borderRadius: 5,
  },
  container: {
    maxHeight: 1000,
  },
  progressRoot: {
    width: '100%',
  },
});

const SubHeading = () => {
  return (
    <div className="registeredTeams__subheader">
      <h3> No teams found with this keyword</h3>
    </div>
  );
};

const CustomTableCell = ({ columns, row }) => {
  return columns.slice(1).map((column) => {
    const value = row[column.id];
    // console.log(column.id === 'payment_status', value)
    if (column.id === 'payment_status') {
      if (value === 'Not Paid Yet') {
        return (
          <TableCell key={column.id} align={'center'} style={{ fontSize: 18 }}>
            <Button variant="contained" color="secondary">
              <Link
                to={`/payment/${row._id}?Team=${row.Team_Name}&Country=${row.Country}&Institution=${row.University}&Coach=${row.Coach}`}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Proceed to pay
              </Link>
            </Button>
          </TableCell>
        );
      }
    }
    return (
      <TableCell key={column.id} align={'center'} style={{ fontSize: 16 }}>
        {value}
      </TableCell>
    );
  });
};

const Teams = (props) => {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [displayTeams, setDisplayTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const classes = useStyles2();
  const [progress, setProgress] = React.useState(0);

  function getSortedTeam(teams) {
    teams.sort((a, b) => {
      if (a.Team_Name.toLowerCase() < b.Team_Name.toLowerCase()) return -1;
      if (b.Team_Name.toLowerCase() < a.Team_Name.toLowerCase()) return 1;
      return 0;
    });
    return teams;
  }

  function showTeams(res) {
    let { success, teams } = res.data;
    console.log({ success, teams });
    if (success) {
      setTeams((prev) => getSortedTeam([...prev, ...teams]));
      setDisplayTeams((prev) => getSortedTeam([...prev, ...teams]));
    } else {
      setTeams([]);
      setDisplayTeams([]);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/v1/admin/par-selected-team-info/0')
      .then(async (res) => {
        console.log(res);
        setIsLoading(false);
        showTeams(res);
        setProgress((prevProgress) => {
          let now = prevProgress + 7;
          if (now >= 100) now = 100;
          return now;
        });
        for (let i = 1; i <= 19; i++) {
          let r = await axios.get(`/api/v1/admin/par-selected-team-info/${i}`);
          showTeams(r);
          if (r.data.teams.length === 0) {
            setProgress((prevProgress) => 100);
            break;
          }
          setProgress((prevProgress) => {
            let now = prevProgress + 7;
            if (now >= 100) now = 100;
            return now;
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setTeams([]);
        setDisplayTeams([]);
      });
  }, []);

  useEffect(() => {
    console.log(teams);
  }, [teams]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterTeams = (e) => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    let temp = [...displayTeams];
    temp = teams.filter(
      (team) =>
        team.Team_Name.toLowerCase().includes(value) ||
        team.Coach.toLowerCase().includes(value) ||
        team.University.toLowerCase().includes(value)
    );
    setDisplayTeams(temp);
  };

  return (
    <div className="registeredTeamsWrapper">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="registeredTeams__header"
            style={{ userSelect: 'none' }}
          >
            <h1> Registered Teams </h1>
            <h4> (For Dhaka Regional Selected Teams) </h4>
            <p style={{ textAlign: 'center', fontSize: 17.5, color: '#444' }}>
              If you don't find your team, please wait. It'll be updated very
              soon.
            </p>
          </div>

          {progress !== 100 && (
            <div
              className="registeredTeams__table"
              style={{ marginTop: 15, marginBottom: 26 }}
            >
              <div style={{ textAlign: 'center', marginBottom: 7 }}>
                <CircularProgress />
              </div>
              <LinearProgressWithLabel value={progress} variant="determinate" />
            </div>
          )}

          <div className="registeredTeams__table" style={{ marginTop: -10 }}>
            {progress === 100 && (
              <div className="top-row">
                <TextField
                  variant="outlined"
                  style={{ backgroundColor: '#fff', width: '100%' }}
                  placeholder="Search for your team information"
                  onInput={filterTeams}
                />
              </div>
            )}
            {error && (
              <Alert
                severity="error"
                style={{ fontSize: 18, marginTop: 15, fontWeight: '700' }}
              >
                {error}
              </Alert>
            )}
            {displayTeams.length === 0 ? (
              <SubHeading />
            ) : (
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={'center'}
                            style={{ minWidth: column.minWidth, fontSize: 19 }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayTeams
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, tableSerial) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.Team}
                            >
                              <TableCell
                                align={'center'}
                                style={{ fontSize: 16 }}
                              >
                                {tableSerial + 1}
                              </TableCell>
                              <CustomTableCell columns={columns} row={row} />
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[100, 200, 300, 500, 1000, 1500]}
                  colSpan={4}
                  component="div"
                  count={teams.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Teams;
