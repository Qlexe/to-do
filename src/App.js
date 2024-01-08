import React, { useState } from "react";
export default App;

function AddTaskForm({ handler }) {
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
        Додати
      </button>
    </div>
  );
}

function Task({ task, changeIsDone, taskDelete }) {
  const [isDone, setIsDone] = useState(task.isDone);

    return (
      <div className="wrapper">
      <div
        className={"task" + (isDone? " task-isDone" : "")}
      >
        <input
        className="task-checkbox"
          type="checkbox"
          onChange={(e) => {
            changeIsDone(task.id);
            setIsDone(!isDone);
            console.log(isDone);
          }}
          checked={isDone}
        />
        <p className="task-text">{isDone ? <s>{task.text}</s> : task.text}</p>
        <p className="task-date">{task.date}</p>
        <button className="task-delete-button" onClick={(e) => taskDelete(task.id)}>X</button>
      </div>
      </div>
    );
}

function TasksList({ tasks, changeIsDone, taskDelete }) {
  let tasksList = [];
  tasks.map((task) => {
    return tasksList.push(
      <Task
        key={task.id}
        id={tasks.indexOf(task)}
        task={task}
        tasks={tasks}
        changeIsDone={changeIsDone}
        taskDelete={taskDelete}
      ></Task>
    );
  });
  return <div className="tasks-list">{tasksList}</div>;
}

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask() {
    const input = document.getElementById("new-task");
    const newTask = {
      id: tasks.length + 1,
      text: input.value,
      isDone: false,
      date: new Date().toLocaleDateString(),
    };
    input.value = "";

    setTasks(tasks.concat(newTask));
  }
  console.log(tasks);

  function changeIsDone(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTasks(newTasks);
  }

  function taskDelete(id) {
    const newTasks = tasks.filter((task) => task.id!== id);
    setTasks(newTasks);
  }

  return (
    <div className="App">
      <AddTaskForm handler={addTask} />
      <TasksList tasks={tasks} changeIsDone={changeIsDone} taskDelete={taskDelete}></TasksList>
    </div>
  );
}
