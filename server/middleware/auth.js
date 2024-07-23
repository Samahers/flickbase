const passport = require("passport");
const { ApiError } = require("./apiError");
const httpStatus = require("http-status");
const { roles } = require("../configs/roles");
const { Aggregate } = require("mongoose");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  //do we have the user or not
  if (err || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "unathorized"));
  }
  req.user = {
    _id: user._id,
    email: user.email,
    role:user.role,
    firstname: user.firstname,
    lastname: user.lastname,
    verified: user.verified
  };
  //check the role of the user
  if (rights.length) {
    //see auth.Route the testrole method
    const action = rights[0]; //createANy, readAny these are the rights
    const resource = rights[1];

    const permission = roles.can(req.user.role)[action](resource); //can the user do [action] on this [resource]
    if (!permission.granted) {
      return reject(
        new ApiError(httpStatus.FORBIDDEN, "sorry, you dont have enough right")
      );
    }

    res.locals.permission = permission;
  }

  resolve();
};

//creating a promise, i can resolve and reject it whenever i want
const auth =
  (...rights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject, rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
