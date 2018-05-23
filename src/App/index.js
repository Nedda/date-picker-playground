import React, { Component } from 'react';
import './styles.css';
import * as R from 'ramda';

import Calendar from 'react-calendar';
import DatePicker from 'react-date-picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';

import { DateRangePicker } from 'react-date-range';
import { defaultStaticRanges, createStaticRanges } from 'react-date-range/src/defaultRanges.js';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      list: [],
      done: [],
      date: new Date(),
      dates: [
        { startDate: new Date(2018, 5, 5),
          endDate: new Date( 2018, 5, 10),
          key: 'range1',
          color: 'green'
        },
        { startDate: new Date(2018, 5, 12),
          endDate: new Date(2018, 5, 20),
          key: 'range2',
          color: 'purple'
        }
      ],
      value: 1,
    }
    this.addToList = this.addToList.bind(this);
    this.removeDoneItemsFromList = this.removeDoneItemsFromList.bind(this);
    this.markItemDone = this.markItemDone.bind(this);
    this.clearDateRange = this.clearDateRange.bind(this);
    this.selectYear = this.selectYear.bind(this);
    this.updateDates = this.updateDates.bind(this);
  }

  addToList(value) {
    this.setState({ list: R.append({ task: value, completed: false} , this.state.list) })
  }

  removeDoneItemsFromList() {
    this.setState({list: R.reject(x => R.equals(x.completed, true), this.state.list)})
  }

  markItemDone(item) {
    const newList = R.map(
      R.when(
        R.propEq('task', item.task), 
        R.assoc('completed', true)
      ), this.state.list);
      this.setState({list: newList})
  }

  clearDateRange() {
    this.setState({
      dates: [
        { startDate: new Date(2018, 5, 12),
          endDate: new Date(2018, 5, 20),
          key: 'range2'
        }
      ]
    })
  }

  selectYear() {
    this.setState({
      dates: [
        { startDate: new Date(2018, 5, 12),
          endDate: new Date(2018, 5, 20),
          key: 'range1'
        },
        { startDate: new Date(2018, 5, 12),
          endDate: new Date(2018, 5, 20),
          key: 'range2'
        }]
    })
  }

  updateDates(x) {
    const rangeBeingUpdated = R.keys(x)[0];
    const newDates = R.map(R.when(
      R.propEq('key', rangeBeingUpdated),
      R.merge(R.__, x[rangeBeingUpdated])
    ), this.state.dates);
    this.setState({dates: newDates})
  }

  render() {
      const newStaticRanges = R.flatten(R.append(
          createStaticRanges([{
              label: 'This Year',
              range: () => ({
                startDate: new Date(2018, 0, 1),
                endDate: new Date(2018, 11, 1),
              })
          }]), defaultStaticRanges))
      console.log(newStaticRanges);
    return (
      <div className="App">
        <DateRangePicker 
          months={1}
          className={'styledDate'}
          scroll={{enabled: true}}
          onChange={(x) => this.updateDates(x) }
          ranges={ this.state.dates }
          dangerouslySetInnerHTML={<div>something</div>}
          staticRanges={newStaticRanges}
        />
        <div onClick={this.clearDateRange}>select Only One</div>
        <div onClick={this.selectYear}>select Two</div>
        { /* 
         <RangeCalendar 
             showClear
             />
          <Calendar 
            activeStartDate={new Date()}
            value={this.state.date}
            selectRange
            onChange={ (x) => this.setState({ date: x }) }
          />
          <div onClick={this.selectYear}>year</div>
          */ }
        </div>
    );
  }
}

export default App;
