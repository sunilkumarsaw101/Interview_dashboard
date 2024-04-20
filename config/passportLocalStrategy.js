const passport = require("passport");
const candidateModel = require("../model/candidate");
const passportLocal = require("passport-local").Strategy;

passport.use(
  new passportLocal(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const candidate = await candidateModel.findOne({ email, password });

        if (candidate) {
          done(null, candidate);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const candidate = await candidateModel.findById(id);
    if (candidate) {
      done(null, candidate);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
});

module.exports= passport;