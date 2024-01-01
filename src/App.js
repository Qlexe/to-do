import React, { useState } from "react";
export default App;

function AddTaskForm({ handler }) {
  return (
    <div className="AddTaskForm">
      <p>Додати справу:</p>
      <input
        title="new task"
        type="text"
        id="new-task"
        onKeyDown={(e) => {
          if (e.key === "Enter") handler();
        }}
      />
      <button id="addBtn" type="submit" onClick={handler}>
        Додати
      </button>
    </div>
  );
}

function TasksList({ listOfTasks }) {
  let tasksList = [];
  console.log(tasksList);
  listOfTasks.map((task) => {
    console.log(task);
    return tasksList.push(
      <div className="task" key={listOfTasks.indexOf(task)}>
        {task}
      </div>
    );
  });
  return tasksList;
}

function App() {
  const [tasks, setTasks] = useState([]);
  function addTask() {
    const input = document.getElementById("new-task");
    const newTask = input.value;
    input.value = "";
    setTasks(tasks.concat(newTask));
    tasks.push(newTask);
  }
  return (
    <div className="App">
      <h1>Мій список справ</h1>
      <AddTaskForm handler={addTask} />
      <TasksList listOfTasks={tasks} />
    </div>
  );
}
