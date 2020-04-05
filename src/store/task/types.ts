import * as moment from 'moment';

export interface Task {
  id: string;
  title: string;
  timeSpent: moment.Duration;
  description?: string;
}

export interface TaskState {
  tasks: Task[];
}

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const START_TASK = "START_TASK";
export const STOP_TASK = "STOP_TASK";
export const ADD_TASK_TIME_SPENT = "ADD_TASK_TIME_SPENT";
export const UPDATE_TASKS = "UPDATE_TASKS";

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface UpdateTasksAction {
  type: typeof UPDATE_TASKS;
  payload: Task[];
}

interface AddTaskTimeSpentAction {
  type: typeof ADD_TASK_TIME_SPENT;
  duration: moment.Duration;
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

export type TaskActionTypes = AddTaskAction | DeleteTaskAction | StartTaskAction | StopTaskAction | UpdateTasksAction | AddTaskTimeSpentAction;
