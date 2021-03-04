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
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../../assests/css/adminTeams.css';
import useFormFields from '../../HandleForms';
import Header from '../../ui/AdminHeader';
import Loader from '../../ui/Loader';

const columns = [
  { id: 'Team', label: 'Team', minWidth: 170 },
  {
    id: 'Country',
    label: 'Country',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'Institution',
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
    id: 'Payment Status',
    label: 'Payment Status',
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
      <h3> No teams have registered yet</h3>
    </div>
  );
};

const Teams = (props) => {
  const { accessToken } = props.cred;
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [fileError, setFileError] = useState(null);
  const { formFields, createChangeHandler } = useFormFields({ file: null });

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const classes = useStyles2();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.file.name !== 'teams.xls') {
      setFileError('Spreadsheet name should be "teams.xls"');
    } else if (formFields.file.size / 1000 / 1000 > 5) {
      setFileError('Spreadsheet size should be less than 5MB');
    } else {
      setFileError(null);
      setIsLoading(true);
      const reqFiles = new FormData();
      reqFiles.append('file', formFields.file);
      const headers = { Authorization: `Bearer ${accessToken}` };
      const { data: response } = await axios.post(
        '/api/v1/admin/team-file-xls-upload',
        reqFiles,
        {
          headers,
        }
      );
      console.log(response.teams);
      setTeams(response.teams);
      setShowSubmitButton(false);
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    setShowSubmitButton(true);
    createChangeHandler('file', true)(e);
  };

  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/v1/admin/team-file-xls').then((res) => {
      const { success, teams } = res.data;
      setIsLoading(false);
      if (success) {
        setTeams(teams);
      } else {
      }
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
          <div className="registeredTeams__header">
            <h1> Registered Teams </h1>
            <h4> (For preliminary) </h4>
          </div>
          <div className="registeredTeams__table">
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
                    >{`"teams.xls"`}</span>
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
            {fileError && (
              <Alert
                severity="error"
                style={{ fontSize: 18, marginTop: 15, fontWeight: '700' }}
              >
                {fileError}
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
                            style={{ minWidth: column.minWidth, fontSize: 18 }}
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
                              role="checkbox"
                              tabIndex={-1}
                              key={row.team}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
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

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Teams);
