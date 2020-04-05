import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as moment from 'moment';
import { AppState } from "../";

import { START_TIMER, PAUSE_TIMER, RESET_TIMER, UPDATE_TIMER, SET_CURRENT_TASK_ID, TimerState } from "./types";
import { addTaskTimeSpent } from "../task/actions";
// import { getCurrentSession } from "./selectors";

let timer: number | undefined

export const startCountdown = (): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
  dispatch(startTimer())
  timer = setInterval(() => {
    const state = getState();
    const currentTime = moment.duration(state.timer.currentTime)
    if (currentTime.asMilliseconds() >= 0) {
      dispatch(updateTime(currentTime.subtract(1, 'second')))
    } else {
      clearInterval(timer)
      triggerNotification()
      dispatch(updateTime(moment.duration(0)))
    }
  }, 1000)
};

export function setCurrentTaskID (id: string) {
  return {
    type: SET_CURRENT_TASK_ID,
    id
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

export function resetTimer (duration: moment.Duration) {
  clearInterval(timer)

  return {
    type: RESET_TIMER,
    duration
  }
}

function triggerNotification() {
  new Notification('Focus session ended', {
    body: 'Let\'s take a break!'
  })
}