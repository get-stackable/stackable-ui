import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import { isUndefined } from 'lodash';

const DateTimeIcon = {
  position: 'relative',
  right: '38px',
  top: '10px',
  opacity: '0.5',
  fontSize: '2rem',
  cursor: 'pointer',
};

class DateAndTime extends React.Component {
  renderInput(props, openCalendar, closeCalendar) {
    return (
      <div>
        <input {...props} disabled style={{ width: '50%' }} />
        <i
          className="calendar icon"
          style={DateTimeIcon}
          onClick={openCalendar}
        />
      </div>
    );
  }
  render() {
    return <Datetime {...this.props} renderInput={this.renderInput} />;
  }
}

export default DateAndTime;
