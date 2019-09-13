import React, {Component} from 'react';
import { connect } from "react-redux";
import * as moment from 'moment';

import { startCountdown, pauseTimer, resetTimer } from './store/timer/actions'
import { AppState } from "./store";
import { TimerState } from './store/timer/types';
import { Button, Text } from 'rebass'

const Store = require('electron-store');
const store = new Store();

interface TimerViewProps {
  startCountdown: typeof startCountdown;
  pauseTimer: typeof pauseTimer;
  resetTimer: typeof resetTimer;
  timer: TimerState;
}

class TimerView extends Component<TimerViewProps> {

  componentWillMount () {
    const tasks = store.get("done.tasks")
  }

  progressPercentage ():number {
    return (this.props.timer.currentTime.seconds()/this.props.timer.initialTime.asSeconds())*100
  }

  _toggleTimer () {
    if (this.props.timer.paused) {
      this.props.startCountdown()
    } else {
      this.props.pauseTimer()
    }
  }

  _resetTimer () {
    this.props.resetTimer(moment.duration(25, 'minutes'))
  }

  render () {
    return (
      <div className="timer">
        <Text
          fontSize={7}
          fontWeight='bold'
          lineHeight='body'
          color='primary'>
          {moment.utc(this.props.timer.currentTime.asMilliseconds()).format("mm:ss")}
        </Text>

        <Button onClick = {this._toggleTimer.bind(this)} mx={2}>{this.props.timer.paused? "Start":"Pause"}</Button>
        <Button onClick = {this._resetTimer.bind(this)} mx={2} variant='outline'>Reset</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  timer: state.timer
});

export default connect(
  mapStateToProps,
  {startCountdown, pauseTimer, resetTimer}
)(TimerView);
