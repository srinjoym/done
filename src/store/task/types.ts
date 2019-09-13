import * as moment from 'moment';

export interface Task {
  id: string;
  title: string;
  initialDuration: moment.Duration;
  currentDuration: moment.Duration;
  running: Boolean;
  description?: string;
}

export interface TaskState {
  tasks: Task[];
  currentTask?: Task;
}

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const START_TASK = "START_TASK";
export const STOP_TASK = "STOP_TASK";
export const UPDATE_TASK = "UPDATE_TASK";

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface UpdateTasksAction {
  type: typeof UPDATE_TASK;
  payload: Task[];
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  meta: {
    id: string;
  };
}

interface StartTaskAction {
  type: typeof START_TASK;
  payload: Task;
}

interface StopTaskAction {
  type: typeof STOP_TASK;
  payload: Task;
}

export type TaskActionTypes = AddTaskAction | DeleteTaskAction | StartTaskAction | StopTaskAction | UpdateTasksAction;
