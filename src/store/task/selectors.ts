import { createSelector } from 'reselect'
import { AppState } from "../index"

export const getTaskState = (state: AppState) => state.task

export const getFocusTaskId = createSelector(
    getTaskState,
    taskState => {
        return taskState.focusTaskId
    }
)

export const getTasks = createSelector(
  getTaskState,
  taskState => {
    return taskState.tasks
  }
)
