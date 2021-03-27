import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../../assests/css/adminTeams.css';
import useFormFields from '../../HandleForms';
import Header from '../../ui/AdminHeader';
import Loader from '../../ui/Loader';
import moment from 'moment';

import LinearProgressWithLabel from '../../ui/ProgressBar';
import CircularProgress from '@material-ui/core/CircularProgress';

const columns = [
  { id: 'Team_Name', label: 'Team', minWidth: 170 },
  {
    id: 'Country',
    label: 'Country',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'University',
    label: 'Institution',
    minWidth: 170,
    align: 'right',
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
    align: 'right',
  },
  {
    id: 'payment_date',
    label: 'Payment Time',
    minWidth: 170,
    align: 'right',
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
      <h3> No teams found with this keyword</h3>
    </div>
  );
};

const Teams = (props) => {
  const { accessToken } = props.cred;
  const [teams, setTeams] = useState([]);
  const [displayTeams, setDisplayTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [fileError, setFileError] = useState(null);
  const { formFields, createChangeHandler } = useFormFields({ file: null });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [progress, setProgress] = React.useState(10);

  const classes = useStyles2();

  function getSortedTeam(teams) {
    teams.sort((a, b) => {
      if (a.Team_Name.toLowerCase() < b.Team_Name.toLowerCase()) return -1;
      if (b.Team_Name.toLowerCase() < a.Team_Name.toLowerCase()) return 1;
      return 0;
    });
    console.log(teams);
    return teams;
  }

  function showTeams(res) {
    let { success, teams } = res.data;
    if (success) {
      setTeams((prev) => getSortedTeam([...prev, ...teams]));
      setDisplayTeams((prev) => getSortedTeam([...prev, ...teams]));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.file.name != 'teams.xlsx') {
      setFileError('Spreadsheet name should be "teams.xlsx"');
    } else if (formFields.file.size / 1000 / 1000 > 5) {
      setFileError('Spreadsheet size should be less than 5MB');
    } else {
      setFileError(null);
      setIsLoading(true);
      const reqFiles = new FormData();
      reqFiles.append('file', formFields.file);
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data: response } = await axios.post(
        '/api/v1/admin/team-file-xlsx-upload',
        reqFiles,
        {
          headers,
        }
      );
      setTeams(response.teams);
      setShowSubmitButton(false);
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    setShowSubmitButton(true);
    createChangeHandler('file', true)(e);
  };

  const modifyDate = (key, value) => {
    if (key === 'payment_date') {
      if (value && value != '-') {
        return moment(value).format('MMMM Do YYYY, h:mm:ss a');
      }
    }
    return value;
  };

  const handleTeamInfoDownload = async () => {
    setIsLoading(true);
    let url = window.location.protocol + '//' + window.location.host;
    if (process.env.NODE_ENV === 'development') url = 'http://localhost:5000';
    window.location = `${url}/api/v1/admin/download-team`;
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/v1/admin/par-team-info/0')
      .then(async (res) => {
        setIsLoading(false);
        showTeams(res);
        setProgress((prevProgress) => {
          let now = prevProgress + 16.6;
          if (now >= 95) now = 100;
          return now;
        });
        for (let i = 1; i <= 5; i++) {
          let r = await axios.get(`/api/v1/admin/par-team-info/${i}`);
          showTeams(r);
          setProgress((prevProgress) => {
            let now = prevProgress + 16.6;
            if (now >= 95) now = 100;
            return now;
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setTeams([]);
        setDisplayTeams([]);
      });
  }, []);

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
          <div className="registeredTeams__header">
            <h1> Registered Teams </h1>
            <h4> (For preliminary) </h4>
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
          <div className="registeredTeams__table">
            {progress === 100 && (
              <div className="top-row">
                <TextField
                  variant="outlined"
                  style={{ backgroundColor: '#fff', width: '100%' }}
                  placeholder="Type to search"
                  onInput={filterTeams}
                />
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ textAlign: 'right' }}>
              <div>
                <input
                  id="fileId"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  onClick={(e) => (e.target.value = null)}
                />
                <label htmlFor="fileId">
                  <Button
                    variant="contained"
                    component="span"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    style={{ fontSize: 17 }}
                  >
                    Upload your
                    <span
                      style={{
                        paddingLeft: 7,
                        paddingRight: 7,
                        fontWeight: '700',
                        textTransform: 'lowercase',
                      }}
                    >{`"teams.xlsx"`}</span>
                    File
                  </Button>
                </label>

                {showSubmitButton && (
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    style={{ fontSize: 17, marginLeft: 10 }}
                    type="Submit"
                  >
                    Submit File
                  </Button>
                )}
              </div>
            </form>
            {teams.length != 0 && (
              <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <Button
                  variant="contained"
                  component="span"
                  className={classes.button}
                  startIcon={<CloudDownloadIcon />}
                  style={{ fontSize: 17 }}
                  onClick={handleTeamInfoDownload}
                >
                  Download Team Informations
                </Button>
              </div>
            )}
            {fileError && (
              <Alert
                severity="error"
                style={{ fontSize: 18, marginTop: 15, fontWeight: '700' }}
              >
                {fileError}
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
                            style={{ minWidth: column.minWidth, fontSize: 18 }}
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
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.team}
                            >
                              {columns.map((column) => {
                                const value = modifyDate(
                                  column.id,
                                  row[column.id]
                                );
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={'center'}
                                    style={{ fontSize: 16 }}
                                  >
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
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

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Teams);
