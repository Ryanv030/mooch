const path = require("path");
const db = require("./../../db/schemas/index");
const users = require("./../../db/models/users");
const bcrypt = require("bcryptjs");

module.exports = app => {
  app.post("/api/userSignUpInfo", (req, res) => {
    const info = req.body;
    users.createUser(info, response => {
      res.send(response.dataValues);
    });
  });

  app.get("/api/getUserData", (req, res) => {
    const info = req.query;

    users.findUser(info, response => {
      if (response !== null) {
        const password = response.dataValues.password;
        bcrypt.compare(info.password, password, (error, result) => {
          if (result) {
            const userData = {
              userID: response.dataValues.userID,
              groups: response.dataValues.groups,
              userName: response.dataValues.userName
            };
            res.send(userData);
          } else {
            res.send("password invalid");
          }
        });
      } else {
        res.send("user not found");
      }
    });
  });

  app.get("/api/user/:user", (req, res) => {
    const info = { userName: req.params.user };
    users.findUser(info, response => {
      if (response) {
        res.send(response);
      } else {
        res.send("invalid");
      }
    });
  });

  app.get("/api/groupUsers/:user", (req, res) => {
    const userID = req.params.user;
    users.groupUserData(userID, response => {
      const userInfo = {
        userID: response.dataValues.userID,
        userName: response.dataValues.userName,
        email: response.dataValues.email
      };
      res.send(userInfo);
    });
  });

  app.put("/api/addGroupToUser", (req, res) => {
    const info = req.body;
    //console.log("ROUTES", info);
    users.addGroup(info);
    res.send("confirm");
  });

  app.get("/api/checkUserName", (req, res) => {
    const userName = req.query;
    console.log(userName);
    users.findUser(userName, response => {
      console.log(response);
      if (response === null) {
        res.send("valid");
      } else {
        res.send("invalid");
      }
    });
  });

  app.get("/api/checkEmail", (req, res) => {
    const email = req.query;
    users.findEmail(email, response => {
      if (response === null) {
        res.send("valid");
      } else {
        res.send("invalid");
      }
    });
  });
};
