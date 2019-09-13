import React, {Component, CSSProperties} from 'react';
import {Task} from './Types'
import * as moment from 'moment';
import { List, Input, Checkbox } from 'antd';
// import {Input} from '@rebass/forms';
import {Card, Heading, Button} from 'rebass'
import { DragDropContext, Droppable, Draggable, DropResult, DraggingStyle, NotDraggingStyle, DraggableProvidedDraggableProps } from "react-beautiful-dnd";

const { Search } = Input;
const Store = require('electron-store');
const store = new Store();

const grid = 8;

type TaskState = {
  tasks: Task[],
  newTaskTitle: string,
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
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle.style
});

const getListStyle = (isDraggingOver:boolean) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class TaskView extends Component<{}, TaskState> {

  componentWillMount(){
    store.clear()
    this.setState({
      tasks: store.get('done.tasks') || [],
      newTaskTitle: ""
    })
    this.handleChange = this.handleChange.bind(this)
    this.addTask = this.addTask.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
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
      id: '_' + Math.random().toString(36).substr(2, 9),
      title: this.state.newTaskTitle,
      initialDuration: moment.duration(25, 'minutes'),
      currentDuration: moment.duration(25, 'minutes'),
      completed: false
    })

    this.setState({
      tasks: tasks
    })
  }

  onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const tasks = reorder(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );

    this.setState({
      tasks
    });
  }

  render () {
    return (
      <div className="tasks">

        <Input
          value={this.state.newTaskTitle}
          placeholder="Add new task"
          onChange={this.handleChange}
          onPressEnter={this.addTask}
        />


        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.tasks.map((item, index) => (
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
                      <Card>
                        <Checkbox />
                        <Heading color="primary">{item.title}</Heading>
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
