import React, {Component, CSSProperties} from 'react';
import * as moment from 'moment';

import { connect } from "react-redux";
import { AppState } from "./store";

import {addTask, updateTasks, deleteTask} from './store/task/actions'
// import {setCurrentTaskID} from './store/task/actions'
import {TaskState, Task} from './store/task/types'

import { Check, Plus } from 'react-feather'
import { Input, Box, Text, Button, IconButton } from '@chakra-ui/core';
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import { TimerState } from './store/timer/types';

const Store = require('electron-store');
const store = new Store();

interface TaskViewProps {
  updateTasks: typeof updateTasks;
  addTask: typeof addTask;
  deleteTask: typeof deleteTask;
  // setCurrentTaskID: typeof setCurrentTaskID;
  task: TaskState;
  timer: TimerState;
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
  overflow: "scroll"
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
        timeSpent: moment.duration(0)
      }

      this.props.addTask(newTask)
      this.setState({newTaskTitle: ""})
    }
  }

  _startTask (taskID: string) {
    // Dispatch select task action
    // this.props.setCurrentTaskID(taskID)

    const tasks = this.props.task.tasks
    tasks.some(task => task.id === taskID && tasks.unshift(task))
    updateTasks(tasks)
  }

  render () {
    return (
      <Box display="flex" flexDirection="column" height="100%">
        <Box flexGrow={1} height="100%" max-height="100%" overflow="scroll">
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  style={getListStyle(
                    snapshot.isDraggingOver
                  )}
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
                          <Box
                            display="flex"
                            py={1}
                            px={3}
                            m={4}
                            backgroundColor={this.props.timer.currentTaskID == item.id ? "gray" : "white"}
                            rounded="lg"
                            borderWidth="1px"
                            borderStyle="solid"
                            >
                            <Text flexGrow={1} my={2}>{item.title}</Text>
                            {/* <IconButton
                              mt={1}
                              size="sm"
                              isRound={true}
                              icon={Plus}
                              onClick={this._startTask.bind(this, item.id)}
                              aria-label="Add to focus session"/> */}
                            <IconButton
                              mt={1}
                              size="xs"
                              isRound={true}
                              icon={() => <Check size={15}/>}
                              onClick={() => this.props.deleteTask(item.id)}
                              aria-label="Complete Task"/>
                          </Box>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Box>

        <Input
          value={this.state.newTaskTitle}
          placeholder="Add Task"
          onChange={this._handleChange}
          onKeyDown={this._handleKeyDown}
          m={4}
          isFullWidth={false}
        />
      </Box>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  task: state.task,
  timer: state.timer
});

export default connect(
  mapStateToProps,
  {addTask, updateTasks, deleteTask}
)(TaskView);
