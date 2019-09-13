import * as moment from 'moment';

export interface TimerState {
  currentTime: moment.Duration;
  initialTime: moment.Duration;
  paused: boolean;
}

export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const RESET_TIMER = "RESET_TIMER";
export const UPDATE_TIMER = "UPDATE_TIMER";

interface StartTimerAction {
  type: typeof START_TIMER;
}

interface UpdateTimerAction {
  type: typeof UPDATE_TIMER;
  duration: moment.Duration;
}

interface PauseTimerAction {
  type: typeof PAUSE_TIMER;
}

interface ResetTimerAction {
  type: typeof RESET_TIMER;
  duration: moment.Duration;
}

export type TimerActionTypes = StartTimerAction | PauseTimerAction | ResetTimerAction | UpdateTimerAction;
