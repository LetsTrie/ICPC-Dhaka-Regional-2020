import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import React from 'react';
import '../../../../assests/css/adminCustomization.css';

const DateTime = ({ selectedDate, handleDateChange }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="DateTimeContainer">
        <div className="DateTimeBlock">
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Choose Contest Date"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </div>
        <div className="DateTimeBlock">
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Choose Contest Time"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DateTime;
