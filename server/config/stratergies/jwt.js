const { Strategy: JwtStrategy } = require("passport-jwt");
const User = require("../../model/User");

//as we are using cookieparser in sserver it will be easy to extract token from cookie from req if its available in browser
const cookieExtractor = (req) => req.cookies?.token;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        //we are sending both token and jwt secret key from googlecallback fun to verify
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        // to get userid from sub:req.user._id which will be in payload, as we are taking user from req

        try {
          //we are taking user from req by calling getuser fun but before getting it we are calling jwt stratergy
          //to check if user is present or not in the database
          //verifying user by checking if user is present in the database or not by using findById method and passing payload.sub which is user id
          const user = await User.findById(payload.sub);
          if (user) {
            done(null, user);
          } else {
            //if user is not present in sub or token is expired .
            done(null, false);
          }
        } catch (err) {
          done(err, false);
        }
      },
    ),
  );
};
