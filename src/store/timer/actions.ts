import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as moment from 'moment';
import { AppState } from "../";


import { START_TIMER, PAUSE_TIMER, RESET_TIMER, UPDATE_TIMER, TimerState } from "./types";

let timer: number | undefined

export const startCountdown = (): ThunkAction<void, AppState, null, Action<string>> => async (dispatch, getState) => {
  dispatch(startTimer())
  timer = setInterval(() => {
    const state = getState();

    if (state.timer.currentTime.asMilliseconds() >= 0) {
      dispatch(updateTime(state.timer.currentTime.subtract(1, 'second')))
    } else {
      clearInterval(timer)
      dispatch(updateTime(moment.duration(0)))
    }
  }, 1000)
};

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
  return {
    type: RESET_TIMER,
    duration
  }
}
