import {
  TaskState,
  Task,
  ADD_TASK,
  DELETE_TASK,
  START_TASK,
  STOP_TASK,
  TaskActionTypes,
  UPDATE_TASK
} from "./types";
import * as moment from 'moment';

const initialTaskState: Task = {
  id: '_' + Math.random().toString(36).substr(2, 9),
  title: "",
  initialDuration: moment.duration(),
  currentDuration: moment.duration(),
  running: false,
}

const initialState: TaskState = {
  tasks: []
};

function taskReducer(
  state = initialTaskState,
  action: TaskActionTypes):Task {
    switch (action.type) {
      case START_TASK:
        return {
          ...state,
          running: true
        };
      case STOP_TASK:
        return {
          ...state,
          running: false
        };
      default:
        return state;
    }
}

export function tasksReducer(
  state = initialState,
  action: TaskActionTypes
): TaskState {
  switch (action.type) {
    case UPDATE_TASK:
      return {
        tasks: action.payload
      };
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload]
      };
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter(
          task => task.id !== action.meta.id
        )
      };
    default:
      const tasks = state.tasks.map((task) => {
        return taskReducer(task, action)
      })
      return { tasks }
  }
}
