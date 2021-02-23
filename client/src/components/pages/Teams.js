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
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assests/css/adminTeams.css';
import Header from '../ui/Header';
import Loader from '../ui/Loader';

const columns = [
  { id: 'Serial', label: 'Serial', minWidth: 100 },
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
    <div className="registeredTeams__subheader">
      <h3> No teams have registered yet</h3>
    </div>
  );
};

const CustomTableCell = ({ columns, row }) => {
  return columns.slice(1).map((column) => {
    const value = row[column.id];
    if (column.id === 'Payment Status') {
      if (value === 'Not Paid Yet') {
        return (
          <TableCell key={column.id} align={'center'} style={{ fontSize: 18 }}>
            <Button variant="contained" color="secondary">
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
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="registeredTeamsWrapper">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="registeredTeams__header" style={{ userSelect: 'none' }}>
            <h1> Registered Teams </h1>
            <h4> (For priliminary) </h4>
            <p style={{ textAlign: 'center', fontSize: 17.5, color: '#444' }}> If you don't find your team, please wait. It'll be updated very soon. </p>
          </div>
          <div className="registeredTeams__table">
            {error && (
              <Alert
                severity="error"
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
                      {teams
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
                  rowsPerPageOptions={[100, 200, 300]}
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
