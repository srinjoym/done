import {
  TimerState,
  START_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  TimerActionTypes,
  UPDATE_TIMER
} from "./types";
import * as moment from 'moment';

const initialState: TimerState = {
  initialTime: moment.duration(25, 'minutes'),
  currentTime: moment.duration(25, 'minutes'),
  paused: true
};

export function timerReducer(
  state = initialState,
  action: TimerActionTypes
): TimerState {
  switch (action.type) {
    case START_TIMER:
      return {
        ...state,
        paused: false
      };
    case UPDATE_TIMER:
      return {
        ...state,
        currentTime: action.duration
      }
    case PAUSE_TIMER:
      return {
        ...state,
        paused: true
      };
    case RESET_TIMER:
      return {
        ...state,
        initialTime: action.duration,
        currentTime: action.duration,
        paused: true
      };
    default:
      return state
  }
}
