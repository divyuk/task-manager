# task-manager

API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks.

## How to use?

1. node install
2. nodemon "./src/index.js"

## Requests to make

- **GET /tasks**: Retrieve all tasks.
- **GET /tasks/:id**: Retrieve a single task by its ID.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update an existing task by its ID.
- **DELETE /tasks/:id**: Delete a task by its ID.

## Extension

Implement filtering and sorting for the **GET /tasks** endpoint. For example, users should be able to filter tasks based on completion status and sort them by creation date.

```cpp
app.get("/tasks", (req, res) => {
  try {
    let filteredTasks = [...taskDB];

    // Filter tasks based on completion status
    if (req.query.flag) {
      filteredTasks = filteredTasks.filter(
        (task) => task.flag === req.query.flag
      );
    }

    // Sort tasks by creation date (timestamp)
    if (req.query.sort === "asc") {
      filteredTasks.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );
    } else if (req.query.sort === "desc") {
      filteredTasks.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
    }

    res.status(200).json(filteredTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
```

- Get all tasks: GET http://localhost:3000/tasks
- Get tasks with **`flag`** set to "Yes": GET http://localhost:3000/tasks?flag=Yes
- Get tasks sorted in ascending order of creation date:GET http://localhost:3000/tasks?sort=asc
- Get tasks with **`flag`** set to "No" and sorted in descending order of creation date:GET http://localhost:3000/tasks?flag=No&sort=desc

---

### Priority level

Endpoint to retrieve tasks based on priority level: **GET /tasks/priority/:level**.

```jsx
app.get("/tasks/priority/:level", (req, res) => {
  const level = req.params.level;
  let filterTasks = [...taskDB];
  filterTasks = filterTasks.filter((task) => task.priority == level);
  res.status(200).send(filterTasks);
});
```
