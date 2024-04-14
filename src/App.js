import React, { useState, useEffect, useRef } from "react";
import {patchTask, addTask} from './fetchData';
export default App;

function AddTaskForm({ handler}) {
  return (
    <div className="add-task-form">
      <input
        title="new task"
        type="text"
        id="new-task"
        onKeyDown={(e) => {
          if (e.key === "Enter") handler();
        }}
        placeholder="Додати нову справу"
      />
      <button id="addBtn" type="submit" onClick={handler}>
        +
      </button>
    </div>
  );
}

function Task({ task, handlerChangeIsDone, handlerTaskDelete }) {
  const [isDone, setIsDone] = useState(task.completed);
  const taskRef = useRef(null);

  useEffect(() => {
    const taskElement = taskRef.current;
    taskElement.style.opacity = 0;

    const timeout = setTimeout(() => {
      taskElement.style.opacity = 1;
    }, 150 * task.id); // Delay based on task id

    return () => clearTimeout(timeout); // Clean up the timeout on unmount
  }, [task.id]);


  return (
    <div id={task.id} className={"task " + (isDone ? " task-isDone" : "")} ref={taskRef}>
      <input
        className="task-checkbox"
        type="checkbox"
        onChange={(e) => {
          handlerChangeIsDone(task.id);
          setIsDone(!isDone);
        }}
        checked={isDone}
      />
      <p className="task-text">{isDone ? <s>{task.title}</s> : task.title}</p>
      {/* <p className="task-date">{task.date}</p> */}
      <button
        className="task-delete-button"
        onClick={(e) => handlerTaskDelete(task.id)}
      >
        X
      </button>
    </div>
  );
}

function TasksList({ tasks, handlerChangeIsDone, handlerTaskDelete}) {

  const tasksList = [];

  tasks
    .sort((a, b) => {
      if (a.isDone === b.isDone) {
        return 0;
      }
      return a.isDone ? 1 : -1;
    })
    .map((task) => {
      return tasksList.push(
        <Task
          key={task.id}
          id={tasks.indexOf(task)}
          task={task}
          handlerChangeIsDone={handlerChangeIsDone}
          handlerTaskDelete={handlerTaskDelete}
        ></Task>
      );
    });
  return <div className="tasks-list">{tasksList}</div>;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  console.log(tasks);

  useEffect(() => {
      const url = "https://jsonplaceholder.typicode.com/todos";
      console.log('userId', userId);
    
      fetch(!userId ? url : url + `?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setTasks(data);
        });
  }, [userId]);

  function handlerAddTask() {
    const input = document.getElementById("new-task");
    if (Number(input.value) && input.value.length <= 2) {
      return setUserId(Number(input.value));
    }
    if (input.value && input.value.length > 1) {
      const newTask = {
        userId: userId,
        id: tasks.length + 1,
        title: input.value,
        completed: false,
      };
      input.value = "";

      addTask(newTask);
      setTasks(tasks.concat(newTask));
    }
  }

  function handlerChangeIsDone(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
      patchTask(task);
      return task;
    });
    setTasks(newTasks);
  }

  function handlerTaskDelete(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  return (
    <div className="App">
      <AddTaskForm handler={handlerAddTask}/>
      <TasksList
        tasks={tasks}
        handlerChangeIsDone={handlerChangeIsDone}
        handlerTaskDelete={handlerTaskDelete}
      ></TasksList>
    </div>
  );
}
