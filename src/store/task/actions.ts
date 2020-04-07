import { Task, ADD_TASK, DELETE_TASK, ADD_TASK_TIME_SPENT, UPDATE_TASKS, START_TASK, SET_TASK_COMPLETE } from "./types";
import * as moment from 'moment';

export function addTaskTimeSpent(id: string, duration: moment.Duration) {
  return {
    type: ADD_TASK_TIME_SPENT,
    meta: {
      id,
      duration
    }
  }
}

export function updateTasks(tasks: Task[]){
  return {
    type: UPDATE_TASKS,
    payload: tasks
  }
}

export function addTask(newTask: Task) {
  return {
    type: ADD_TASK,
    payload: newTask
  };
}

export function startTask(id: string) {
  return {
    type: START_TASK,
    meta: {
      id
    }
  }
}

export function deleteTask(id: string) {
  return {
    type: DELETE_TASK,
    meta: {
      id
    }
  };
}

export function setTaskComplete(id: string, status: boolean) {
  return {
    type: SET_TASK_COMPLETE,
    meta: {
      id,
      status
    }
  }
}
