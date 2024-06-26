var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const Agent = require("../models/agentModel");
const Customer = require("../models/customerModel");

exports.sign_in = function (req, res) {
  console.log(req.body);
  const { email, password } = req.body;
  Customer.findOne({ email }, function (err, user) {
    if (err) throw err;
    if (user && user.comparePassword(password)) {
      return res.json({
        token: jwt.sign(
          {
            email: user.email,
            fullName: user.fullName,
            role: "customer",
            _id: user._id,
          },
          "RESTFULAPIs"
        ),
        email: user.email,
        fullName: user.fullName,
        role: "customer",
        _id: user._id,
      });
    } else {
      Agent.findOne({ email }, function (err, user) {
        if (err) throw err;
        if (user && user.comparePassword(password)) {
          return res.json({
            token: jwt.sign(
              {
                email: user.email,
                fullName: user.agentName,
                role: "agent",
                _id: user._id,
              },
              "RESTFULAPIs"
            ),
            fullName: user.agentName,
            role: "agent",
            email: user.email,
            _id: user._id,
          });
        } else {
          return res.json({
            message: "Authentication failed. Invalid user or password.",
          });
        }
      });
    }
  });
};


exports.loginRequired = function (req, res, next) {
  console.log("Here", req.user);
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};

exports.roleRequired = function (role) {
  return function (req, res, next) {
    console.log("KKK",req);
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient rights" });
    }
  };
};

exports.profile = function (req, res, next) {
  if (req.user) {
    res.json({
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role,
    });
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};



//Agent Register
exports.agentRegister = function (req, res) {
  var newUser = new Agent(req.body);
  console.log(newUser);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};


//Customer Register
exports.customerRegister = function (req, res) {
  var newUser = new Customer(req.body);
  console.log(newUser);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

//To Check whether EmailId is Unique
exports.CheckEmail = async (req, res) => {
  try {
    const eml = req.query.email;
    const foundEmail = await Customer.findOne({ email: eml });
    res.json({ uniqueemail: foundEmail });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "Error" });
  }
};


//Get User by ID
exports.getUserById = async (req, res) => {
  const userId = req.params._id;
  try {
    const getUser = await Customer.findOne({ _id: userId });
    console.log(getUser);
    res.send(getUser);
  } catch (err) {
    console.error("Error getting Users", err);
    res.status(500).send("Error getting Users");
  }
};

//Update User Details
exports.updateUser = async (req, res) => {
  const cId = req.params._id;
  const updatedUser = req.body;
  try {
    const updateByid = await Customer.findByIdAndUpdate(cId, updatedUser);
    // console.log("UP",updateByid);
    res.send({
      message: "User Updated successfully",
    });
  } catch (err) {
    console.error("Error updating User", err);
    res.status(500).send("Error updating User");
  }
};
