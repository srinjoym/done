import * as moment from 'moment';

export type Task = {
  id: string,
  title: string,
  initialDuration: moment.Duration,
  currentDuration: moment.Duration,
  completed: boolean,
  description?: string,
}

