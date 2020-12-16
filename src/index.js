const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

// add function that all routes have to go through it
app.use(express.json());

// storing data in the application's memory
const users = [];

// Get: Fetch backend information
app.get("/users", (request, response) => {
  // Query Params: Filters and pagination
  const { name } = request.query;

  const results = name
    ? users.filter((user) => user.name.includes(name))
    : users;

  return response.json(results);
});
// POST: Create information on the backend
app.post("/users", (request, response) => {
  // Request Body: Content when creating or editing a resource (JSON)
  const { name, age, email } = request.body;

  const user = { id: uuidv4(), name, age, email };

  users.push(user);

  return response.json(user);
});

// PUT: Change information on the backend | PATCH: Update specific resource
app.put("/users/:id", (request, response) => {
  const { id } = request.params;
  const { name, age, email } = request.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: "User not found." });
  }

  const user = {
    id,
    name,
    age,
    email,
  };

  users[userIndex] = user;

  return response.json(user);
});

// DELETE: Delete information on the backend
app.delete("/users/:id", (request, response) => {
  // Route Params: Identify resources (Update / Delete)
  const { id } = request.params;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return response.status(400).json({ error: "User not found." });
  }

  users.splice(userIndex, 1);

  return response.status(204).send(); // return blank
});

app.listen(3333, () => {
  console.log("🛴 Backend started!");
});
