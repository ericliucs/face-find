"use strict"
import bcryptjs from "bcryptjs"
import cors from "cors"
import express from "express";
import knex from "knex";

const database = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "alter",
    password: "FFAVSCLvr1969@",
    database: "smart-brain",
  },
});

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("/profile/:id", async (req, res) => {
  const ID = parseInt(req.params.id);
  let user = await database.select("*").from("users").where("id", ID);
  if (user.length) {
    res.json(user[0]);
  } else {
    res.status(400).json("User not found");
  }
});

app.post("/register", async (req, res) => {
  const {email, name, password} = req.body;
  let salt = bcryptjs.genSaltSync(10);
  let password_hash = bcryptjs.hashSync(password, salt);
  database.transaction(trx => {
    trx
        .insert({
          password_hash: password_hash,
          email: email
        })
        .into("login")
        .returning("email")
        .then(loginEmail => {
          return trx("users")
              .returning("*")
              .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
              })
              .then(user => {
                res.json(user[0])
              })
        })
        .then(trx.commit)
        .catch(trx.rollback)
  }).catch(err => {
    res.status(400).json(err);
    console.log(err);
  });
});

app.post("/signin", async (req, res) => {
  try {
    let login = await database
        .select("email", "password_hash")
        .from("login")
        .where("email", "=", req.body.email);
    if (!bcryptjs.compareSync(req.body.password, login[0].password_hash)) {
      res.status(400).json("Incorrect credentials");
    } else {
      try {
        let user = await database
            .select("*")
            .from("users")
            .where("email", "=", req.body.email);
        res.json(user[0]);
      } catch (_) {
        res.status(400).json("Unable to get user");
      }
    }
  } catch (_) { // Might be table desync if this ever goes off
    res.status(400).json("Unable to sign in");
  }
});

app.post("/image", async (req, res) => {
  const ID = parseInt(req.body.id);
  try {
    let entries = await database("users")
        .where("id", "=", ID)
        .increment("entries", 1)
        .returning("entries")
    res.json(entries[0].entries);
  } catch (err) {
    res.status(400).json("Unable to get number of entries");
  }
});

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
