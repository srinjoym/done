import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as moment from 'moment';
import { AppState } from "../";
import { START_TIMER, PAUSE_TIMER, RESET_TIMER, UPDATE_TIMER, ADVANCE_SESSION } from "./types";
import { addTaskTimeSpent } from "../task/actions";

const { ipcRenderer } = require('electron')
let timer: number | undefined

export const startCountdown = (): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
  dispatch(startTimer())
  timer = window.setInterval(() => {
    const state = getState();
    const currentTime = moment.duration(state.timer.currentTime)
    if (currentTime.asMilliseconds() >= 0) {
      dispatch(updateTime(currentTime.subtract(1, 'second')))

      if (state.task.focusTaskId)
        dispatch(addTaskTimeSpent(state.task.focusTaskId, moment.duration(1, 'second')))
    } else {
      clearInterval(timer)
      triggerNotification()
      dispatch(updateTime(moment.duration(0)))
    }
  }, 1000)
};

export function advanceSession () {
  return {
    type: ADVANCE_SESSION,
  }
}

export function updateTime (duration: moment.Duration) {
  return {
    type: UPDATE_TIMER,
    duration
  }
}

export function startTimer () {
  return {
    type: START_TIMER
  }
}

export function pauseTimer () {
  clearInterval(timer)

  return {
    type: PAUSE_TIMER
  }
}

export function resetTimer () {
  clearInterval(timer)

  return {
    type: RESET_TIMER,
  }
}

function triggerNotification() {
  ipcRenderer.send('sendNotification')
}