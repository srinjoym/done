import {
  TaskState,
  Task,
  ADD_TASK,
  DELETE_TASK,
  TaskActionTypes,
  UPDATE_TASKS,
  ADD_TASK_TIME_SPENT,
  SET_TASK_COMPLETE,
  SET_FOCUS_TASK_ID
} from "./types";

import * as moment from 'moment';
import produce from 'immer';

const initialTaskState: Task = {
  id: '_' + Math.random().toString(36).substr(2, 9),
  title: "",
  timeSpent: moment.duration(0),
  completed: false
}

const initialState: TaskState = {
  tasks: []
};

const taskReducer = (state: Task = initialTaskState, action) => {
  return produce(state, draft => {
    // Return early if we're not processing this task
    if (action.meta.id !== state.id)
      return;

    switch (action.type) {
      case ADD_TASK_TIME_SPENT:
        draft.timeSpent = state.timeSpent.add(action.meta.duration)
        break
      case SET_TASK_COMPLETE:
        draft.completed = action.meta.status
        break
    }
  })
}

export const tasksReducer = (state = initialState, action: TaskActionTypes) => {
  return produce(state, draft => {
    switch (action.type) {
      case UPDATE_TASKS:
        draft.tasks = action.payload
        break
      case ADD_TASK:
        draft.tasks = [...draft.tasks, action.payload]
        break
      case DELETE_TASK:
        draft.tasks = draft.tasks.filter(
          task => task.id !== action.meta.id
        )
        break
      case SET_FOCUS_TASK_ID:
        draft.focusTaskId = action.meta.id
        break
      default:
        draft.tasks = draft.tasks.map(task => taskReducer(task, action))
    }
  })
}
