const express = require("express");
const router = express.Router();

// routes
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const articleRoute = require("./articles.route");

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },{
    path: "/articles",
    route: articleRoute,
  },

];

//route.use(path,file) <- a reminder of how it works

routesIndex.forEach((route)=>{

    router.use(route.path, route.route);
})

module.exports = router;
