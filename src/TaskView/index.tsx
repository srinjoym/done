import React, {useState} from 'react'
import * as moment from 'moment'
import { connect } from "react-redux"
import { AppState } from "../store"
import { Check, Plus } from 'react-feather'
import { Input, Box, Text, IconButton } from '@chakra-ui/core'
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"

import {addTask, updateTasks, deleteTask, setTaskComplete, setFocusTaskId} from '../store/task/actions'
import {Task} from '../store/task/types'
import { getTasks, getFocusTaskId } from '../store/task/selectors'
import taskCard from './taskCard'

interface TaskViewProps {
  tasks: Task[];
  focusTaskId: String;
  updateTasks: typeof updateTasks;
  addTask: typeof addTask;
  deleteTask: typeof deleteTask;
  setTaskComplete: typeof setTaskComplete;
  setFocusTaskId: typeof setFocusTaskId;
}

// a little function to help us with reordering the result
const reorder = (list: Task[], startIndex:number, endIndex:number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TaskView:React.FC<TaskViewProps> = ({tasks, focusTaskId, updateTasks, addTask, setFocusTaskId, setTaskComplete}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const _handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLSelectElement;
    setNewTaskTitle(target.value);
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const reorderedTasks = reorder(tasks, result.source.index, result.destination.index);
    updateTasks(reorderedTasks);
  }

  const _handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const newTask = {
        id: '_' + Math.random().toString(36).substr(2, 9),
        title: newTaskTitle,
        timeSpent: moment.duration(0),
        completed: false
      }

      addTask(newTask)
      setNewTaskTitle("")
    }
  }

  const _completeTask = (id: string, completed: boolean) => {
    if (completed === true && focusTaskId) {
      setFocusTaskId(undefined)
    }

    setTaskComplete(id, completed)
  }

  const _taskCard = (item: Task) => taskCard(
    item,
    focusTaskId === item.id,
    () => _completeTask(item.id, !item.completed),
    () => setFocusTaskId(item.id))

  const focusedTask = tasks.find(task => task.id === focusTaskId)
  const otherTasks = tasks.filter(task => task.id !== focusTaskId && task.completed === false)

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box flexGrow={1} height="100%" max-height="100%" overflowY="scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {focusedTask && _taskCard(focusedTask)}

                {otherTasks.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {_taskCard(item)}
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
        value={newTaskTitle}
        placeholder="Add Task"
        onChange={_handleChange}
        onKeyDown={_handleKeyDown}
        m={4}
        isFullWidth={false}
      />
    </Box>
  )
}

const mapStateToProps = (state: AppState) => ({
  tasks: getTasks(state),
  focusTaskId: getFocusTaskId(state)
});

export default connect(
  mapStateToProps,
  {addTask, updateTasks, deleteTask, setTaskComplete, setFocusTaskId}
)(TaskView);
