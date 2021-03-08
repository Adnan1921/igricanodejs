const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
  clientID: "2771419413074905",
  clientSecret: "a132045e84863af58f5bdb645bdc142a",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));