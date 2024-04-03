const assignment = {
  id: 5,
  name: "Lab 5",
  dueDate: "2021-10-15",
  points: 10,
  title: "title",
};

let courses = [
  {
    id: 1,
    name: "CSE 110",
    instructor: "Dr. M",
    assignments: [assignment],
  },
  {
    id: 2,
    name: "CSE 120",
    instructor: "Dr. N",
    assignments: [assignment],
  },
  {
    id: 3,
    name: "CSE 130",
    instructor: "Dr. M",
    assignments: [assignment],
  },
];

const module = {
  id: "MOD001",
  name: "module",
  description: "module desc",
  course: "module1",
};

const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

function Lab5(app) {
  //   app.delete("/a5/courses/:id", (req, res) => {
  //     const id = parseInt(req.params.id);
  //     const course = courses.find((c) => c.id === id);
  //     res.json(course);
  //   });
  app.get("/a5/courses/:id/delete", (req, res) => {
    const id = parseInt(req.params.id);
    courses = courses.filter((c) => c.id !== id);
    res.json(courses);
  });
  app.get("/a5/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find((c) => c.id === id);
    res.json(course);
  });

  app.get("/a5/courses", (req, res) => {
    const instructor = req.query.instructor;
    if (instructor) {
      const cs = courses.filter((c) => c.instructor === instructor);
      res.json(cs);
      return;
    }
    res.json(courses);
  });
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  app.get("/a5/assignment/points/:points", (req, res) => {
    assignment.points = req.params.points;
    res.send(assignment);
  });
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  app.get("/a5/assignment/name/:name", (req, res) => {
    assignment.name = req.params.name;
    res.send(assignment);
  });
  app.get("/a5/assignment/name", (req, res) => {
    res.send(assignment.name);
  });
  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/a5/calculator", (req, res) => {
    // res.send(req.query);
    const num1 = parseInt(req.query.num1);
    const num2 = parseInt(req.query.num2);
    const operation = req.query.operation;
    switch (operation) {
      case "add":
        res.send(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
        break;
      case "sub":
        res.send(`The difference of ${num1} and ${num2} is ${num1 - num2}`);
        break;
      default:
        res.send("Invalid operation");
    }
  });
  app.get("/a5/add/:num1/:num2", (req, res) => {
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const sum = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${sum}`);
    // res.send(req.params);
  });

  app.get("/a5/welcome", (req, res) => {
    res.send("<h1>This is lab 5</h1>");
  });
  app.get("/a5/multiply/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const prod = parseInt(a) * parseInt(b);
    res.send(prod.toString());
  });
  app.get("/a5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const quot = parseInt(a) / parseInt(b);
    res.send(quot.toString());
  });
  app.get("/a5/module", (req, res) => {
    res.json(module);
  });
  app.get("/a5/module/name", (req, res) => {
    res.json(module.name);
  });
  //   app.get("/a5/todos", (req, res) => {
  //     res.json(todos);
  //   });
  //   app.get("/a5/todos/create", (req, res) => {
  //     const newTodo = {
  //       id: new Date().getTime(),
  //       title: "New Task",
  //       completed: false,
  //     };
  //     todos.push(newTodo);
  //     res.json(todos);
  //   });
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

//   app.get("/a5/todos/:id/delete", (req, res) => {
//     const { id } = req.params;
//     const todo = todos.find((t) => t.id === parseInt(id));
//     const todoIndex = todos.indexOf(todo);
//     if (todoIndex !== -1) {
//       todos.splice(todoIndex, 1);
//     }
//     res.json(todos);
//   });
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });
  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });

  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });
  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.completed = completed;
    res.json(todos);
  });
  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.description = description;
    res.json(todos);
  });
  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter((t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });
}

export default Lab5;
