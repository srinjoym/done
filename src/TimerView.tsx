import React, {Component} from 'react';
import { connect } from "react-redux";
import * as moment from 'moment';

import { startCountdown, pauseTimer } from './store/timer/actions'
import { AppState } from "./store";
import { TimerState } from './store/timer/types';
import { Button } from 'rebass'

const Store = require('electron-store');
const store = new Store();

interface TimerViewProps {
  startCountdown: typeof startCountdown;
  pauseTimer: typeof pauseTimer;
  timer: TimerState;
}

class TimerView extends Component<TimerViewProps> {

  componentWillMount () {
    const tasks = store.get("done.tasks")
  }

  progressPercentage ():number {
    return (this.props.timer.currentTime.seconds()/this.props.timer.initialTime.asSeconds())*100
  }

  _handleClick () {
    if (this.props.timer.paused) {
      this.props.startCountdown()
    } else {
      this.props.pauseTimer()
    }
  }

  render () {
    return (
      <div className="timer">
        <h1>{moment.utc(this.props.timer.currentTime.asMilliseconds()).format("HH:mm:ss")}</h1>
        <Button onClick = {this._handleClick.bind(this)}>{this.props.timer.paused? "Start":"Pause"}</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  timer: state.timer
});

export default connect(
  mapStateToProps,
  {startCountdown, pauseTimer}
)(TimerView);
