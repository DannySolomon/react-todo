export const getTodos = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );

  return response;
};

export const addTodos = async (task) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response;
};

export const modifyTodo = async (task) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${task.id}`,
    {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  return response;
};

export const deleteTodo = async (task) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${task.id}`,
    {
      method: "DELETE",
    }
  );
  return response;
};
