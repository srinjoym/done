import * as moment from 'moment';

export type Task = {
  title: string,
  initialDuration: moment.Duration,
  currentDuration: moment.Duration,
  description: string
}

