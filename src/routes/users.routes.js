import express from "express";
import fs from "fs";

const router = express.Router();
const dbPath = "./src/db.json";

const readDB = () => JSON.parse(fs.readFileSync(dbPath, "utf-8"));
const writeDB = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

/* Create User */
router.post("/add", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }

  const data = readDB();
  const newUser = { id: Date.now(), name, email };
  data.users.push(newUser);
  writeDB(data);

  res.status(201).json({ message: "User added", user: newUser });
});

/* Get All Users */
router.get("/", (req, res) => {
  const data = readDB();
  res.json(data.users);
});

/* Get Single User */
router.get("/:userId", (req, res) => {
  const data = readDB();
  const user = data.users.find(
    (u) => u.id === Number(req.params.userId)
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});

/* Update User */
router.put("/update/:userId", (req, res) => {
  const data = readDB();
  const index = data.users.findIndex(
    (u) => u.id === Number(req.params.userId)
  );

  if (index === -1)
    return res.status(404).json({ message: "User not found" });

  data.users[index] = { ...data.users[index], ...req.body };
  writeDB(data);

  res.json({ message: "User updated", user: data.users[index] });
});

/* Delete User */
router.delete("/delete/:userId", (req, res) => {
  const data = readDB();
  const filtered = data.users.filter(
    (u) => u.id !== Number(req.params.userId)
  );

  if (filtered.length === data.users.length)
    return res.status(404).json({ message: "User not found" });

  data.users = filtered;
  writeDB(data);

  res.json({ message: "User deleted" });
});

export default router;
