import { createSelector } from 'reselect'
import { AppState } from "../index"

export const getTimer = (state: AppState) => state.timer

export const getCurrentSession = createSelector(
  getTimer,
  timer => {
    return timer.sessions[timer.currentSessionID]
  }
)

export const getPaused = createSelector(
  getTimer,
  timer => {
    return timer.paused
  }
)

export const getCurrentTimeString = createSelector(
  getTimer,
  timer => {
    return timer.currentTime
  }
)

export const getSessionId = createSelector(
  getTimer,
  timer => {
    console.log(timer.currentSessionID)
    return timer.currentSessionID
  }
)
