import { Task, ADD_TASK, DELETE_TASK, UPDATE_TASK, START_TASK } from "./types";

export function updateTasks(tasks: Task[]){
  return {
    type: UPDATE_TASK,
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
