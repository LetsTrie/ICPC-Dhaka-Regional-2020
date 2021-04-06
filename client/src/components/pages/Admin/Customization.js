import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../../assests/css/adminCustomization.css';
import navOptions from '../../../data/navbar';
import Header from '../../ui/AdminHeader';
import DateTime from './Customization/DateTime';
import FileUploadBlock from './Customization/FileUploadBlock';

const urlSlug = (url) => url.toLowerCase().split(' ').join('-');

const getInfos = (name) => {
  return navOptions
    .find((n) => n.name === name)
    .submenu.map((sm) => ({ name: sm.name, notPage: sm.notPage }))
    .filter((sm) => sm.notPage === true)
    .map((s) => s.name);
};

const createState = (arr) => {
  const obj = {};
  for (let c of arr) obj[urlSlug(c)] = null;
  return obj;
};

const committeeArray = getInfos('Committee');
const committeeInitialObject = createState(committeeArray);

const contestInfoArray = getInfos('Contest Info');
const contestInfoInitialObject = createState(contestInfoArray);

const Customization = (props) => {
  const { accessToken } = props.cred;

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateChanged, setDateChanged] = useState(false);
  const [committee, setCommittee] = useState(committeeInitialObject);
  const [contestInfo, setContestInfo] = useState(contestInfoInitialObject);

  const handleDateChange = (date) => {
    setDateChanged(true);
    setSelectedDate(date);
  };

  useEffect(() => {
    axios
      .get(`/api/v1/admin/contest-time`)
      .then((r) => r.data)
      .then((res) => setSelectedDate(new Date(res.date)))
      .catch((err) => console.error(err));
  }, []);

  const submitDateChange = async () => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    await axios.post(
      `/api/v1/admin/contest-time`,
      { date: selectedDate },
      { headers }
    );
    setDateChanged(false);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="mainHeader"> Page Customization </h1>

        <div className="block">
          <h2 className="block__heading">Contest Time</h2>
          <DateTime
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
          {dateChanged && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              style={{ fontSize: 13.3 }}
              type="Submit"
              onClick={submitDateChange}
            >
              Save changes
            </Button>
          )}
        </div>

        <div className="block">
          <h2 className="block__heading">Committee</h2>

          {committeeArray.map((c) => (
            <FileUploadBlock
              title={c}
              key={c}
              container={committee}
              setContainer={setCommittee}
              section={'committee'}
              extension={'pdf'}
            />
          ))}
        </div>

        <div className="block">
          <h2 className="block__heading">Contest Info</h2>

          {contestInfoArray.map((c) => (
            <FileUploadBlock
              title={c}
              key={c}
              container={contestInfo}
              setContainer={setContestInfo}
              section={'contestInfo'}
              extension={'pdf'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cred: state.credentialReducer,
});

const mapDispatchToAction = {};
export default connect(mapStateToProps, mapDispatchToAction)(Customization);
