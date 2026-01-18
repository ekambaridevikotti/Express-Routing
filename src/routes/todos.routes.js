import express from "express";
import fs from "fs";

const router = express.Router();
const dbPath = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

/* Create Todo */
router.post("/add", (req, res) => {
  const { title, completed } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const data = readDB();
  const newTodo = {
    id: Date.now(),
    title,
    completed: completed ?? false,
  };

  data.todos.push(newTodo);
  writeDB(data);

  res.status(201).json({ message: "Todo added", todo: newTodo });
});

/* Get All Todos */
router.get("/", (req, res) => {
  const data = readDB();
  res.json(data.todos);
});

/* Get Single Todo */
router.get("/:todoId", (req, res) => {
  const data = readDB();
  const todo = data.todos.find(
    (t) => t.id === Number(req.params.todoId)
  );

  if (!todo) return res.status(404).json({ message: "Todo not found" });

  res.json(todo);
});

/* Update Todo */
router.put("/update/:todoId", (req, res) => {
  const data = readDB();
  const index = data.todos.findIndex(
    (t) => t.id === Number(req.params.todoId)
  );

  if (index === -1)
    return res.status(404).json({ message: "Todo not found" });

  data.todos[index] = { ...data.todos[index], ...req.body };
  writeDB(data);

  res.json({ message: "Todo updated", todo: data.todos[index] });
});

/* Delete Todo */
router.delete("/delete/:todoId", (req, res) => {
  const data = readDB();
  const filtered = data.todos.filter(
    (t) => t.id !== Number(req.params.todoId)
  );

  if (filtered.length === data.todos.length)
    return res.status(404).json({ message: "Todo not found" });

  data.todos = filtered;
  writeDB(data);

  res.json({ message: "Todo deleted" });
});

export default router;
