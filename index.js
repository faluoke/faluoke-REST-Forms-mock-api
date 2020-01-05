const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const users = [
  { name: "test", email: "test@test.com", password: "123123" },
  {
    name: "faruk",
    email: "test@test.com",
    password: "123123"
  }
];

app.get("/api/users", (req, res) => res.json(users));
app.get("/api/user/:id", (req, res) => {
  const id = req.params.id;
  if (users[id]) {
    res.json(users[id]);
  } else {
    res.send("no such user");
  }
});
app.post("/api/add", (req, res) => {
  if (req.body.name && req.body.email && req.body.password) {
    users.push(req.body);
    res.send("successful");
  } else {
    res.send("missing parameter");
  }
});
app.put("/api/update/password/:id", (req, res) => {
  const id = req.params.id;
  if (users[id] && req.body.password) {
    if (req.body.password.length < 8) {
      return res.send("password needs to be longer than 8 char");
    }
    users[id].password = req.body.password;
    res.send("successful");
  } else {
    res.send("no such user");
  }
});
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
