import React, {Component} from 'react';
import {Task} from './Types'
import * as moment from 'moment';
const storage = require('electron-json-storage')

type TaskState = {
  tasks: Task[],
  newTaskTitle: string
}

class TaskView extends Component<{}, TaskState> {

  componentWillMount(){
    this.setState({
      tasks: storage.get('tasks') || [],
      newTaskTitle: ""
    })
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
  }

  componentWillUnmount(){
    storage.set('tasks', this.state.tasks)
  }

  handleChange(e: React.FormEvent) {
    const target = e.target as HTMLSelectElement;
    this.setState({newTaskTitle: target.value});
  }

  addTask(){
    const tasks = this.state.tasks
    tasks.push({
      title: this.state.newTaskTitle,
      duration: moment.duration(25, 'minutes'),
      description: ""
    })

    this.setState({
      tasks: tasks
    })
  }

  render () {
    return (
      <div>
        <div className="input-group mt-4">
          <input value={this.state.newTaskTitle} onChange={this.handleChange} type="text" className="form-control" placeholder="Let's get started..." aria-label="Task name" aria-describedby="button-addon4"/>

          <div className="input-group-append" id="button-addon4">
            <button onClick={this.addTask} className="btn btn-outline-secondary" type="button">Add</button>
          </div>
        </div>

        <ul className="list-group">
          {this.state.tasks.map((task, _) => (
            <li className="list-group-item">{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TaskView;
