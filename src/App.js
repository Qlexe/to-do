import React, { useState } from "react";
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
        Додати
      </button>
    </div>
  );
}

function Task({ task, setTasks, tasks }) {
  const [focus, setFocus] = useState(false);
  function changeIsDone() {
    // setTasks(tasks[tasks.indexOf(task)].isDone = true);
    console.log(tasks[tasks.indexOf(task)].isDone + "- tasks[tasks.indexOf(task)].isDone");
  }

  if(focus) {
  return (
    <div className="task focus" onMouseMove={(e) => setFocus(true)} onMouseLeave={(e) => setFocus(false)}>
      <input type="checkbox" onClick={(e) => {changeIsDone()}}></input>
      <p className="task-text">{task.text}</p>
      <p className="task-date">{task.date}</p>
      <button>X</button>
    </div>
  ) 
  }
  return (
    <div className="task" onMouseMove={(e) => setFocus(true)}>
      <p className="task-text">{task.text}</p>
      <p className="task-date">{task.date}</p>
    </div>
  )
}

function TasksList({ tasks, setTasks }) {
  let tasksList = [];
  tasks.map((task) => {
    return tasksList.push(
      <Task key={task.id} id={tasks.indexOf(task)} task={task} setTasks={setTasks} tasks={tasks}></Task>
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
      <TasksList tasks={tasks} setTasks={setTasks}></TasksList>
    </div>
  );
}
