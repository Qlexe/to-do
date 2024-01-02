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

function Task({ task }) {
  const [focus, setFocus] = useState(false);
  if(focus) {
  return (
    <div className="task" onMouseMove={(e) => setFocus(true)} onMouseLeave={(e) => setFocus(false)}>
      <input type="checkbox"></input>
      <p className="task-text">{task.text}</p>
      <p className="task-date">{task.date}</p>
      <button>X</button>
    </div>
  )
       } else {
  return (
    <div key={task.id} className="task" onMouseMove={(e) => setFocus(true)}>
      <p className="task-text">{task.text}</p>
      <p className="task-date">{task.date}</p>
    </div>
  );
}
}

function TasksList({ listOfTasks }) {
  let tasksList = [];
  listOfTasks.map((task) => {
    return tasksList.push(
      <Task key={task.id} id={listOfTasks.indexOf(task)} task={task}></Task>
    );
  });
  return tasksList;
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

  return (
    <div className="App">
      <h1>Мій список справ</h1>
      <AddTaskForm handler={addTask} />
      <TasksList listOfTasks={tasks} />
    </div>
  );
}
