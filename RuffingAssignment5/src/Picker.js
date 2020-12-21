import React from 'react';
import './picker.css';

/**
 * Simple component with no state.
 *
 * See the basic-react from lecture 11 for an example of adding and
 * reacting to changes in state.
 */
export default class Picker extends React.Component {
  /**
   * @constructor
   * @param {Object} props which stands for properties
   */
  constructor(props) {
    super(props);
    this.state = {
      months: ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
        'Thursday', 'Friday', 'Saturday'],
      date: new Date(),
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }
  /**
   * @return {object} a <div> containing a <table>
   */
  render() {
    return (
      // Top of the calendar (month and arrows) will be a div label
      // Table elements (the days) will have their own ids
      <div>
        <button id="prev" onClick={this.prev}>&#10094;</button>
        {/* Displays the month in words in the label */}
        <span id="display">
          {this.state.months[this.state.date.getMonth()]}
          -{this.state.date.getFullYear()}</span>
        {/* Displays the year in the label */}
        <button id="next" onClick={this.next}>&#10095;</button>
        <table>
          <tbody>
            <tr>
              <th id='Sunday'>S</th>
              <th id='Monday'>M</th>
              <th id='Tuesday'>T</th>
              <th id='Wednesday'>W</th>
              <th id='Thursday'>T</th>
              <th id='Friday'>F</th>
              <th id='Saturday'>S</th>
            </tr>
            <tr>
              <td id='d0'></td>
              <td id='d1'></td>
              <td id='d2'></td>
              <td id='d3'></td>
              <td id='d4'></td>
              <td id='d5'></td>
              <td id='d6'></td>
            </tr>
            <tr>
              <td id='d7'></td>
              <td id='d8'></td>
              <td id='d9'></td>
              <td id='d10'></td>
              <td id='d11'></td>
              <td id='d12'></td>
              <td id='d13'></td>
            </tr>
            <tr>
              <td id='d14'></td>
              <td id='d15'></td>
              <td id='d16'></td>
              <td id='d17'></td>
              <td id='d18'></td>
              <td id='d19'></td>
              <td id='d20'></td>
            </tr>
            <tr>
              <td id='d21'></td>
              <td id='d22'></td>
              <td id='d23'></td>
              <td id='d24'></td>
              <td id='d25'></td>
              <td id='d26'></td>
              <td id='d27'></td>
            </tr>
            <tr>
              <td id='d28'></td>
              <td id='d29'></td>
              <td id='d30'></td>
              <td id='d31'></td>
              <td id='d32'></td>
              <td id='d33'></td>
              <td id='d34'></td>
            </tr>
            <tr>
              <td id='d35'></td>
              <td id='d36'></td>
              <td id='d37'></td>
              <td id='d38'></td>
              <td id='d39'></td>
              <td id='d40'></td>
              <td id='d41'></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  /**
   * @return {void} function has no return statement
   */
  prev() {
    const currDay = new Date().getDate() - 1;
    if (document.getElementById('today')) {
      document.getElementById('today').style.backgroundColor = 'white';
      document.getElementById('today').id = 'd' + currDay;
    }
    this.setState({date: new Date(this.state.date.getFullYear(),
        this.state.date.getMonth() - 1)}, () => {
      this.setupDays();
    });
  }
  /**
   * @return {void} function has no return statement
   */
  next() {
    const currDay = new Date().getDate() - 1;
    if (document.getElementById('today')) {
      document.getElementById('today').style.backgroundColor = 'white';
      document.getElementById('today').id = 'd' + currDay;
    }
    this.setState({date: new Date(this.state.date.getFullYear(),
        this.state.date.getMonth() + 1)}, () => {
      this.setupDays();
    });
  }
  /**
   * @return {void} function has no return statement
   */
  setupDays() {
    const firstCellId = new Date(this.state.date.getFullYear(),
        this.state.date.getMonth(), 1).getDay();
    const numDaysInMonth = new Date(this.state.date.getFullYear(),
        this.state.date.getMonth()+1, 0).getDate();
    /* Fills the days in calendar with nothing before the
    first day fo the month */
    if (firstCellId > 0) {
      for (let j = firstCellId; j >= 0; j--) {
        document.getElementById('d' + j).innerText = '';
      }
    }
    /* Fills in the days in the calendar with nothing
    after the last day of the month */
    for (let k = numDaysInMonth; k <= 41; k++) {
      document.getElementById('d' + k).innerText = '';
    }
    /* Fills in the days in the calendar with number 1 to numDaysInMonth */
    const currMonth = new Date().getMonth();
    const currYear = new Date().getFullYear();
    const currDay = new Date().getDate();
    let cellId = firstCellId;
    for (let i = 1; i <= numDaysInMonth; i++) {
      document.getElementById('d' + cellId.toString()).innerText = i;
      if ((i == currDay) &&
        (this.state.date.getMonth() == currMonth) &&
        (this.state.date.getFullYear() == currYear)) {
        // add .style and change id=today
        document.getElementById('d' + cellId.toString()).id = 'today';
        document.getElementById('today').style.backgroundColor='yellow';
      }
      cellId++;
    }
  }
  /**
   * @return {void} function has no return statement
   */
  componentDidMount() {
    this.setupDays();
  }
}

