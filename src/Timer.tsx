import React, {Component} from 'react';
import {Task} from './Types';
import Circle from 'react-circle';
import * as moment from 'moment';
const storage = require('electron-json-storage')

type TimerState = {
  tasks: Task[],
  initialTime: moment.Duration,
  currentTime: moment.Duration,
  isCountingDown: Boolean
}

class Timer extends Component<{}, TimerState> {

  componentWillMount () {
    this.setState({
      tasks: storage.get('tasks'),
      initialTime: moment.duration(1, 'minute'),
      currentTime: moment.duration(1, 'minute'),
      isCountingDown: true
    })
  }

  componentDidMount () {
    setInterval(() => {
      console.log(this.state.currentTime.seconds())
      console.log(this.state.initialTime.seconds())
      if (this.state.isCountingDown && this.state.currentTime.seconds() >= 0) {
        this.setState({
          currentTime: this.state.currentTime.subtract(1, 'second'),
        })
      }
    }, 1000)
  }

  progressPercentage ():number {
    return Math.round(this.state.currentTime.seconds()/this.state.initialTime.asSeconds())*100
  }

  render () {
    return (
      <div>
        <Circle progress={this.progressPercentage()} />

        <ul className="list-group">
          {this.state.tasks.map((task, _) => (
            <li className="list-group-item">{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Timer;
