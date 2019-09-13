import React, {Component, CSSProperties} from 'react';
import * as moment from 'moment';

import { connect } from "react-redux";
import { AppState } from "./store";

import {addTask, updateTasks} from './store/task/actions'
import {TaskState, Task} from './store/task/types'

import { Input, } from '@rebass/forms';
import { Card, Text } from 'rebass'
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

const { Search } = Input;
const Store = require('electron-store');
const store = new Store();

interface TaskViewProps {
  updateTasks: typeof updateTasks;
  addTask: typeof addTask;
  task: TaskState;
}

interface TaskViewState {
  newTaskTitle: string
}

// a little function to help us with reordering the result
const reorder = (list: Task[], startIndex:number, endIndex:number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableProvidedDraggableProps):CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle.style
});

const getListStyle = (isDraggingOver:boolean) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: 8,
  width: 250
});

class TaskView extends Component<TaskViewProps, TaskViewState> {

  componentWillMount(){
    this.setState({
      newTaskTitle: ""
    })
    this._handleChange = this._handleChange.bind(this)
    this._handleKeyDown = this._handleKeyDown.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  _handleChange(e: React.FormEvent) {
    const target = e.target as HTMLSelectElement;
    this.setState({newTaskTitle: target.value});
  }

  onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const tasks = reorder(
      this.props.task.tasks,
      result.source.index,
      result.destination.index
    );

    this.props.updateTasks(tasks);
  }

  _handleKeyDown (e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      const newTask = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        title: this.state.newTaskTitle,
        initialDuration: moment.duration(25, 'minutes'),
        currentDuration: moment.duration(25, 'minutes'),
        running: false
      }

      this.props.addTask(newTask)
      this.setState({newTaskTitle: ""})
    }
  }

  _startTask (taskID: string) {
    // Dispatch select task action
    // this.props.startTask(taskID)
  }

  render () {
    return (
      <div className="tasks">
        <Input
          value={this.state.newTaskTitle}
          placeholder="Add Task"
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
        />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {this.props.task.tasks.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps
                        )}
                      >
                        <Card marginY={3} p={2} sx={{
                          border:"1px solid black",
                          borderRadius:"4px"
                        }}>
                          <Text>{item.title}</Text>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  task: state.task
});

export default connect(
  mapStateToProps,
  {addTask, updateTasks}
)(TaskView);
