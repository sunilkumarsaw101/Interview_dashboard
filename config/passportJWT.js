const passport = require("passport");
const candidateModel = require("../model/candidate");
const passportJWT = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new passportJWT(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
      secretOrKey: "text",
    },
    async function (payload, done) {
      try {
        const user = await candidateModel.findOne({ email: payload });
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports= passport;