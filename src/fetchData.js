export function patchTask(changedTask) {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  console.log(changedTask);
  fetch(url + changedTask.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      completed: changedTask.completed,
    }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Isn`t given data");
      return response.json();
    })
    .catch((error) => console.error("The problem with PATCH error", error));
}

export function deleteTaskById(id) {
  const url = "https://jsonplaceholder.typicode.com/todos/";

  fetch(url + id, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) throw new Error("Isn`t given data");
      return response.json();
    })
    .catch((error) => console.error("The problem with DELETE error", error));
}

export function addTask(newTask) {
  const url = "https://jsonplaceholder.typicode.com/todos/";
  console.log(newTask);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(newTask),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Isn`t given data");
      return response.json();
    })
    .catch((error) => console.error("The problem with POST error", error));
}
