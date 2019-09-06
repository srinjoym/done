import * as moment from 'moment';

export type Task = {
  title: string,
  duration: moment.Duration,
  description: string
}

