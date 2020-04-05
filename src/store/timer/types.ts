import * as moment from 'moment';

export enum SessionType {
  Work = "Work",
  Break = "Break"
}

export interface Session {
  duration: string;
  type: SessionType
}

export interface TimerState {
  currentSessionID:number;
  sessions: Session[];
  currentTime: string;
  paused: boolean;
  currentTaskID?: string;
}

export const START_TIMER = "START_TIMER";
export const PAUSE_TIMER = "PAUSE_TIMER";
export const RESET_TIMER = "RESET_TIMER";
export const UPDATE_TIMER = "UPDATE_TIMER";
export const ADVANCE_SESSION = "ADVANCE_SESSION";

interface AdvanceSessionAction {
  type: typeof ADVANCE_SESSION
}
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

export type TimerActionTypes = StartTimerAction | PauseTimerAction | ResetTimerAction | UpdateTimerAction | AdvanceSessionAction;
