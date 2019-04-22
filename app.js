var express = require("express");
var mongoose = require("mongoose");
var db1 = require("./app_servers/models/db");
var db = db1.connection;
var bodyparser = require('body-parser');
var http = require("http");
var expressValidator=require('express-validator');
var session =require('express-session');
//var db = model.connection;
//var bodyparser = require('body-parser');
//var cors = require("cors");
var MongoStore = require("connect-mongo")(session);
var path = require("path");
//var session = require('express-session');
var app = express();
//const ejsLint = require("ejs-lint");
//define route
const route = require("./app_servers/routes/route");
//const route1 = require("./app_api/routes/index")
//portno
//const port = 3000;
//adding middlewares
//app.use(cors());
//body-parser

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
//app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));
//app.set('views', path.join(__dirname, 'views'));
//app.set('views', './views/');
app.set("views", path.join(__dirname, "app_servers", "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

//adding static files
app.use(express.static(path.join(__dirname, "public")));
//routes

app.use("/", route);
global.globalstring="";



//sessions for tracking logins
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false,
    maxAge: new Date(Date.now() + 36000),
    store: new MongoStore({
      mongooseConnection: db,
      collection: 'sessions',
      
      url:'mongodb://localhost:27017/test'
    })
  })
);

//mam
/*
app.use("/signup.html", function(req, res, next) {
console.log('123456');
  if (req.session.username) {
    
    res.locals.user = req.session.userId;
    res.locals.username = req.session.username;
    res.send(res.session);
  }
  next();
});
*/

//mine
//var sess;
/*app.get('/index.html',function(req,res)
{
  sess=req.session;
  if(sess.username) {
    /*
    * This line check Session existence.
    * If it existed will do some action.
    */
 //       res.redirect('/index.html');
 //   }
 //   else {
 //       res.render('/signin.html');
  //  }
//});

/*app.post('/signin.html',function(req,res){
  sess = req.session;
  sess.username=req.body.username;
  console.log('1111');
  console.log(sess.username);
  res.redirect('index.html');
});
*/
/*
app.post('/signup.html',function(req,res){
  console.log('hello city');
  sess = req.session;
  sess.username=req.body.username;
  var city=req.body.city;

  console.log(city);
  console.log(sess.username);
  res.redirect('index.html');
});
*/
/*
app.get('/watchhist.html',function(req,res){
  sess = req.session;
if(sess.username) {
res.write('<h1>Hello '+sess.username+'</h1>');
res.end('<a href="+">Logout</a>');
} else {
    res.write('<h1>Please login first.</h1>');
    res.end('<a href="+">Login</a>');
}
});
*/
app.get('/signout',function(req,res){
req.session.destroy(function(err) {
  if(err) {
    console.log(err);
  } else {
    res.redirect('/');
  }
});

});
//app.use("/api",route1);
//connect to mongodb
//mongoose.connect("mongodb://localhost:27017/ticketing_web");
/*var dbURI = "mongodb://localhost:27017/ticketing_web";
if (process.env.NODE_ENV === "production") {
  //just to test I have placed this url
   //dbURI = "mongodb://shamsa:shamsa123@ds263571.mlab.com:63571/loc8r";
}
mongoose.connect(
  dbURI,
  { useNewUrlParser: true }
);
//on connection
mongoose.connection.on("connected", () => {
  console.log("connected to db mongodb");
});
//on error
mongoose.connection.on("error", err => {
  if (err) {
    console.log("error in db connection" + err);
  }
});
*/
//testing server
/*
app.get("/", (req, res) => {
  res.send("foobar");
});
app.listen(port, () => {
  console.log("server started at port no :" + port);
});
*/
var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}