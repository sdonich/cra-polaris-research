import React from 'react';
import {DatePicker} from '@shopify/polaris';

let year = () => new Date().getFullYear();
let month = () => new Date().getMonth();

export default class DatePickerExample extends React.Component {
  state = {
    month: month(),
    year: year(),
    selected: {
      start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
      end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    },
  };

  render() {
    const {month, year, selected} = this.state;

    return (
      <div style={{height: '400px', width: '400px', margin: '30px auto'}}>
        <DatePicker
          month={month}
          year={year}
          onChange={this.handleChange}
          onMonthChange={this.handleMonthChange}
          selected={selected}
          weekStartsOn={1}
        />
      </div>
    );
  }

  handleChange = (value) => {
    this.setState({selected: value});
  };

  handleMonthChange = (month, year) => {
    this.setState({
      month,
      year,
    });
  };
}
