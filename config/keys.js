if (process.env.NODE_ENV === "production") {
    //Production enviroment
    module.exports = require("./prodCredentials");
  } else {
    //Development enviroment
    module.exports = require("./devCredentials");
  }
  