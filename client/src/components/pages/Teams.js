import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import '../../assests/css/adminTeams.css';
import Header from '../ui/Header';
import Loader from '../ui/Loader';
import { Button } from '@material-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const columns = [
  { id: 'Team', label: 'Team', minWidth: 170 },
  {
    id: 'Country',
    label: 'Country',
    minWidth: 170,
  },
  {
    id: 'Institution',
    label: 'Institution',
    minWidth: 170,
  },
  {
    id: 'Coach',
    label: 'Coach',
    minWidth: 170,
  },
  {
    id: 'Payment Status',
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
    marginTop: 25,
    borderRadius: 5,
  },
  container: {
    maxHeight: 1000,
  },
});

const SubHeading = () => {
  return (
    <div className='registeredTeams__subheader'>
      <h3> No teams have registered yet</h3>
    </div>
  );
};

const CustomTableCell = ({ columns, row }) => {
  return columns.map((column) => {
    const value = row[column.id];
    if (column.id === 'Payment Status') {
      if (value === 'Not Paid Yet') {
        return (
          <TableCell key={column.id} align={'center'} style={{ fontSize: 18 }}>
            <Button variant='contained' color='secondary'>
              <Link
                to={`/payment/${row.teamId}?Team=${row.Team}&Country=${row.Country}&Institution=${row.Institution}&Coach=${row.Coach}`}
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
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles2();

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/admin/team-file-xls').then((res) => {
      const { teams } = res.data;
      setTeams(teams);
      setIsLoading(false);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {error && (
              <Alert
                severity='error'
                style={{ fontSize: 18, marginTop: 15, fontWeight: '700' }}
              >
                {error}
              </Alert>
            )}

            {teams.length === 0 ? (
              <SubHeading />
            ) : (
              <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label='sticky table'>
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
                      {teams
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role='checkbox'
                              tabIndex={-1}
                              key={row.Team}
                            >
                              <CustomTableCell columns={columns} row={row} />
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[100, 200, 300]}
                  colSpan={4}
                  component='div'
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
