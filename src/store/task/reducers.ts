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

const initialTaskState: Task = {
  id: '_' + Math.random().toString(36).substr(2, 9),
  title: "",
  timeSpent: moment.duration(0),
  completed: false
}

const initialState: TaskState = {
  tasks: []
};

function taskReducer(
  state = initialTaskState,
  action: TaskActionTypes):Task {
    switch (action.type) {
      case ADD_TASK_TIME_SPENT:
        if (action.meta.id === state.id) {
          return {
            ...state,
            timeSpent: state.timeSpent.add(action.meta.duration)
          }
        } else {
          return state;
        }
        // falls through
      case SET_TASK_COMPLETE:
        if (action.meta.id === state.id) {
          return {
            ...state,
            completed: action.meta.status
          }
        } else {
          return state;
        }
        // falls through
      default:
        return state;
    }
}

export function tasksReducer(
  state = initialState,
  action: TaskActionTypes
): TaskState {
  switch (action.type) {
    case UPDATE_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(
          task => task.id !== action.meta.id
        )
      };
    case SET_FOCUS_TASK_ID:
      return {
        ...state,
        focusTaskId: action.meta.id
      };
    default:
      const tasks = state.tasks.map((task) => {
        return taskReducer(task, action)
      })
      return { ...state, tasks }
  }
}
