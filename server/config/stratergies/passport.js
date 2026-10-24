const passport = require("passport");

require("./google-login")(passport);
require("./jwt")(passport);

module.exports = passport;
