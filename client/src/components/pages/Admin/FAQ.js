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
  return navOptions.find((n) => n.name === name).submenu.map((sm) => sm.name);
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
        <h1 className="mainHeader"> Admin FAQ </h1>


        <div className="block">
          <h2 className="block__heading">FAQ File</h2>

          <FileUploadBlock
              title={'FAQ'}
              key={1}
              container={committee}
              setContainer={setCommittee}
              section={'faq'}
              extension={'xls'}
            />
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
