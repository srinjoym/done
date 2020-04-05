import {
  TaskState,
  Task,
  ADD_TASK,
  DELETE_TASK,
  TaskActionTypes,
  UPDATE_TASKS,
  ADD_TASK_TIME_SPENT
} from "./types";
import * as moment from 'moment';

const initialTaskState: Task = {
  id: '_' + Math.random().toString(36).substr(2, 9),
  title: "",
  timeSpent: moment.duration(0)
}

const initialState: TaskState = {
  tasks: []
};

function taskReducer(
  state = initialTaskState,
  action: TaskActionTypes):Task {
    switch (action.type) {
      case ADD_TASK_TIME_SPENT:
        return {
          ...state,
          timeSpent: state.timeSpent.add(action.duration)
        }
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
