import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import './index.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState(0);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [assignUser, setAssignUser] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [desc, setDesc] = useState(true);
  const [list, setTaskList] = useState(false);

  const saveTask = () => {
    if (editTaskId) {
      // Update the edited task
      const updatedTasks = tasks.map(task => {
        if (task.id === editTaskId) {
          return {
            ...task,
            description: taskDescription,
            date: taskDate,
            time: taskTime,
            user: assignUser
          };
        }
        return task;
      });
  
      setTasks(updatedTasks);
      setEditTaskId(null);
    } else {
      // Add a new task
      const newTask = {
        id: tasks.length + 1,
        description: taskDescription,
        date: taskDate,
        time: taskTime,
        user: assignUser
      };
  
      setTasks([...tasks, newTask]);
    }
  
    setTaskDescription('');
    setTaskDate('');
    setTaskTime('');
    setAssignUser('');
    setDesc(!desc);
    setTaskList(!list);
    setCount(tasks.length + 1);
  };

  const deleteTask = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      setTasks([...tasks]);
      setCount(tasks.length);
    }
  };
  

  const handleTaskEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setTaskDescription(taskToEdit.description);
      setTaskDate(taskToEdit.date);
      setTaskTime(taskToEdit.time);
      setAssignUser(taskToEdit.user);
      setEditTaskId(taskId);
    }
    setDesc(!desc);
    setTaskList(!list);
  };

  return (
    <div className="home-page">
      <div className="main-page">
        <div className="task-container">
          <h1 className="head">Tasks &nbsp;{count}</h1>
          <button className="add" onClick={() => handleTaskEdit(null)}>+</button>
        </div>
        {list && (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className="task-item">
                <img src="https://img.freepik.com/premium-photo/3d-rendering-profile-user-icon-symbols-background-blue-color-front-view_607106-10.jpg" alt="user" height="50" width="40" />
                <div className="desc">
                  <h5 className="task-desc">{task.description}</h5>
                  <p className="task-date">{task.date}</p>
                </div>
                <div className="task-item-actions">
                  <button onClick={() => handleTaskEdit(task.id)}>✎</button>
                  <button onClick={() => deleteTask(task.id)}><RiDeleteBinLine className="icons"/></button>
                </div>
              </div>
            ))}
          </div>
        )}
        {desc && (
          <div className="task-show">
            <div className="description-container">
              <label htmlFor="task">Task Description</label>
              <input
                type="text"
                id="task"
                placeholder="Enter your task"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>
            <div className="data-container">
              <div className="date-container">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  placeholder='Date'
                  required
                />
              </div>
              <div className="time-container">
                <label htmlFor="time">Time</label>
                <input
                  type="text"
                  id="time"
                  value={taskTime}
                  placeholder='Time'
                  onChange={(e) => setTaskTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="user-container">
              <label htmlFor="options">Assign User</label>
              <select
                id="options"
                value={assignUser}
                onChange={(e) => setAssignUser(e.target.value)}
                className='select-menu'
                required
              >
                <option value="Plan User">Plan User</option>
                <option value="Plan User 1">Plan User 1</option>
                <option value="Plan User 2">Plan User 2</option>
              </select>
            </div>
            <div className="buttons-container">
            
              <button className="cancel" onClick={() => setEditTaskId(null)}>
                Cancel
              </button>
              <button className="save " onClick={saveTask}>
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;