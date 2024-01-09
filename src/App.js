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
        +
      </button>
    </div>
  );
}

function Task({ task, handlerChangeIsDone, handlerTaskDelete }) {
  const [isDone, setIsDone] = useState(task.isDone);

  return (
    <div className={"task" + (isDone ? " task-isDone" : "")}>
      <input
        className="task-checkbox"
        type="checkbox"
        onChange={(e) => {
          handlerChangeIsDone(task.id);
          setIsDone(!isDone);
        }}
        checked={isDone}
      />
      <p className="task-text">{isDone ? <s>{task.text}</s> : task.text}</p>
      <p className="task-date">{task.date}</p>
      <button
        className="task-delete-button"
        onClick={(e) => handlerTaskDelete(task.id)}
      >
        X
      </button>
    </div>
  );
}

function TasksList({ tasks, handlerChangeIsDone, handlerTaskDelete }) {
  let tasksList = [];
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
          tasks={tasks}
          handlerChangeIsDone={handlerChangeIsDone}
          handlerTaskDelete={handlerTaskDelete}
        ></Task>
      );
    });
  return <div className="tasks-list">{tasksList}</div>;
}

function App() {
  const [tasks, setTasks] = useState([]);

  function handlerAddTask() {
    const input = document.getElementById("new-task");
    if (input.value && input.value.length > 1) {
      const newTask = {
        id: tasks.length + 1,
        text: input.value,
        isDone: false,
        date: new Date().toLocaleDateString(),
      };
      input.value = "";

      setTasks(tasks.concat(newTask));
    }
  }

  function handlerChangeIsDone(id) {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isDone = !task.isDone;
      }
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
      <AddTaskForm handler={handlerAddTask} />
      <TasksList
        tasks={tasks}
        handlerChangeIsDone={handlerChangeIsDone}
        handlerTaskDelete={handlerTaskDelete}
      ></TasksList>
    </div>
  );
}
