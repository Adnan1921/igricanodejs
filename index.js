/*  EXPRESS SETUP  */

const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + '/assets'));
const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('App listening on port ' + port));
/*  PASSPORT SETUP  */

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/* MONGOOSE SETUP */


const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase',
  { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

mongoose.Promise = global.Promise;



app.get('/', function (req, res) {
  res.render("landing.ejs", { title: 'Hey', message: 'Hello there!' })
})

// ROLE
var nameSchema = new mongoose.Schema({
    ulogaKonobar: String,
    ulogaSanker: String,
    ulogaGost: String,
    ulogaKuhar: String
});
var User = mongoose.model("User", nameSchema);
app.get("/settings", (req, res) => {
  res.render("settings", {
    varijabla: "konj",
});
});


app.post("/addname", (req, res) => {
  var userOptions = new User(req.body);
  userOptions.save()
      .then(item => {
          res.render("stolovi"); 
      })
      .catch(err => {
          res.status(400).send("Nije spaseno");
      });
});

// STOLOVI

var stoSchema = new mongoose.Schema({
  stoVeliki: String,
  stoSrednji: String,
  stoMali: String,
  stolicaJedna: String,
  stoliceDvije: String,
  stoliceTri: String,
  stoliceCetiri: String,
  stoRucak: String,
  stoKafa: String

});
var Sto = mongoose.model("Sto", stoSchema);

app.get("/stolovi", (req, res) => {
  res.render("stolovi");
});


app.post("/addstola", (req, res) => {
  var stoOptions = new Sto(req.body);
  stoOptions.save()
      .then(item => {
          res.send("Rezervisano");
      })
      .catch(err => {
          res.status(400).send("Nije rezervisano");
      });
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());


/* ROUTES */
const connectEnsureLogin = require('connect-ensure-login');

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/settings');
    });

  })(req, res, next);
});


app.get('/login',
  (req, res) => res.sendFile('html/login.html',
  { root: __dirname })
);




app.get('/private',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/private.html', {root: __dirname})
);

app.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({user: req.user})
);
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

