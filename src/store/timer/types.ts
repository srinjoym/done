import * as moment from 'moment';
import { Task } from '../task/types';

export enum SessionType { Work, Break }

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
export const SET_CURRENT_TASK_ID = "SET_CURRENT_TASK_ID";

interface SetCurrentTaskIDAction {
  type: typeof SET_CURRENT_TASK_ID,
  id: string
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

export type TimerActionTypes = StartTimerAction | PauseTimerAction | ResetTimerAction | UpdateTimerAction | SetCurrentTaskIDAction;
