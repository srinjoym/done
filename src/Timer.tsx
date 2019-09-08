import React, {Component} from 'react';
import {Task} from './Types';
import { Progress } from 'antd';

import * as moment from 'moment';

const Store = require('electron-store');
const store = new Store();

type TimerState = {
  tasks: Task[],
  initialTime: moment.Duration,
  currentTime: moment.Duration,
  isCountingDown: Boolean
}

class Timer extends Component<{}, TimerState> {

  componentWillMount () {
    this.setState({
      tasks: [],
      initialTime: moment.duration(1, 'minute'),
      currentTime: moment.duration(1, 'minute'),
      isCountingDown: true
    })
  }

  componentDidMount () {
    setInterval(() => {
      if (this.state.isCountingDown && this.state.currentTime.seconds() >= 0) {
        this.setState({
          currentTime: this.state.currentTime.subtract(1, 'second'),
        })
      }
    }, 1000)
  }

  progressPercentage ():number {
    return (this.state.currentTime.seconds()/this.state.initialTime.asSeconds())*100
  }

  render () {
    return (
      <div>
        <Progress type="circle" percent={this.progressPercentage()} />
      </div>
    );
  }
}

export default Timer;
