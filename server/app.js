/**
 * server to handle auth
 * DB = SQLite
 * bcrypt - hashing user passwords
 * jwt - manage user auth
 * body-parser - read json data sent to server
 */
"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const DB = require("./db");
const config = require("./config");

const db = new DB("sqlitedb");
const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const enableCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
};

app.use(enableCrossDomain);
app.use(router);

// define auth routes
router.post("/register", function(req, res) {
  db.insert(
    [req.body.name, req.body.email, bcrypt.hashSync(req.body.password, 8)],
    function(err) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .send("There was a problem registering the user.");
      }
      db.selectByEmail(req.body.email, (err, user) => {
        if (err)
          return res.status(500).send("There was a problem getting user");
        let token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token, user: user });
      });
    }
  );
});

router.post("/login", (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) {
      return res.status(500).send("Error on Server");
    }
    if (!user) {
      return res.status(404).send("No user found");
    }
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      res.status(401).send({ auth: false, token: null });
    }
    let token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    });
    res.status(200).send({ auth: true, token, user });
  });
});

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
