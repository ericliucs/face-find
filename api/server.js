import express from "express";

const app = express();
app.use(express.json());

const mockDatabase = {
  users: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "cookie",
      entries: 0,
      joined: new Date()
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane@example.com",
      password: "cream",
      entries: 0,
      joined: new Date()
    }
  ]
};

app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.post("/register", (req, res) => {
  mockDatabase.users.push(createNewUser(req.body));
  console.log(mockDatabase.users);
  res.json("Created user");
});

app.post("/signin", (req, res) => {
  let foundUser = false;
  for (const user of mockDatabase.users) {
    if (user.email === req.body.email && user.password === req.body.password) {
      res.json(`Success! Logged in as ${user.name}`);
      foundUser = true;
      break;
    }
  }
  if (!foundUser) {
    res.status(400).send("Credentials denied");
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

function createNewUser(registerReqBody) {
  if (!registerReqBody) {
    throw new Error("Request body missing");
  }
  return {
    id: mockDatabase.users.length + 1,
    ...registerReqBody,
    entries: 0,
    joined: new Date()
  };
}
