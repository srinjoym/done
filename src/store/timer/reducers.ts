import {
  TimerState,
  START_TIMER,
  PAUSE_TIMER,
  RESET_TIMER,
  UPDATE_TIMER,
  Session,
  SessionType,
  ADVANCE_SESSION
} from "./types";
import * as moment from 'moment';
import produce from 'immer';

const workSession: Session = {
  duration: moment.duration(1, 'second').toISOString(),
  type: SessionType.Work
}

const shortBreakSession: Session = {
  duration: moment.duration(5, 'minutes').toISOString(),
  type: SessionType.Break
}

const longBreakSession: Session = {
  duration: moment.duration(15, 'minutes').toISOString(),
  type: SessionType.Break
}

const initialState: TimerState = {
  currentSessionID: 0,
  sessions: [workSession, shortBreakSession, workSession, shortBreakSession, workSession, shortBreakSession, workSession, shortBreakSession, workSession, longBreakSession],
  currentTime: moment.duration(workSession.duration).toISOString(),
  paused: true
};

export const timerReducer = (state: TimerState = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case START_TIMER:
        draft.paused = false;
        break;
      case UPDATE_TIMER:
        draft.currentTime = action.duration.toISOString();
        break;
      case PAUSE_TIMER:
        draft.paused = true;
        break;
      case RESET_TIMER:
        draft.currentTime = draft.sessions[draft.currentSessionID].duration;
        break;
      case ADVANCE_SESSION:
        draft.currentSessionID = (draft.currentSessionID + 1)%10
        draft.currentTime = draft.sessions[draft.currentSessionID].duration;
    }
  })
}

