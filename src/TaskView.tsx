import React, {Component} from 'react';
import {Task} from './Types'
import * as moment from 'moment';
import { List, Avatar, Input } from 'antd';

const { Search } = Input;
const Store = require('electron-store');
const store = new Store();

type TaskState = {
  tasks: Task[],
  newTaskTitle: string
}

class TaskView extends Component<{}, TaskState> {

  componentWillMount(){
    this.setState({
      tasks: store.get('done.tasks') || [],
      newTaskTitle: ""
    })
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
  }

  componentWillUnmount(){
    store.set('done.tasks', this.state.tasks)
  }

  handleChange(e: React.FormEvent) {
    const target = e.target as HTMLSelectElement;
    this.setState({newTaskTitle: target.value});
  }

  addTask(){
    console.log("adding")
    const tasks = this.state.tasks
    tasks.push({
      title: this.state.newTaskTitle,
      initialDuration: moment.duration(25, 'minutes'),
      currentDuration: moment.duration(25, 'minutes'),
      description: ""
    })

    this.setState({
      tasks: tasks
    })
  }

  render () {
    return (
      <div>
        <Search
          value={this.state.newTaskTitle}
          placeholder="Let's get started..."
          onChange={this.handleChange}
          style={{ width: 200 }}
          enterButton="Add"
          onPressEnter={this.addTask}
        />

        <List
          itemLayout="horizontal"
          dataSource={this.state.tasks}
          renderItem={task => (
            <List.Item>
              <List.Item.Meta
                title={task.title}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default TaskView;
