const GoogleStratergy = require("passport-google-oauth20").Strategy;
const User = require("../../model/User");

module.exports = (passport) => {
  passport.use(
    new GoogleStratergy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const user = await User.findOneAndUpdate(
            //to check if user already exists in the database or not
            { googleId: profile?.id },
            //if not create new user in the database
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
            },
            { upsert: true, new: true },
          );
          //done callback with user
          done(null, user);
        } catch (err) {
          done(err, null);
        }
      },
    ),
  );
};
