var express = require("express");
var router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
var mysql = require("mysql");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "newlogin",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL connected...");
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/cities", function (req, res, next) {
  res.render("cities", { title: "Express" });
});

router.get("/pass", function (req, res, next) {
  res.render("pass", { title: "Express" });
});

router.get("/home", function (req, res) {
  res.render("home", { title: "Express" });
});

router.get("/vender", function (req, res) {
  res.render("vender", { title: "Express" });
});
router.get("/autherer", function (req, res) {
  res.render("autherer", { title: "Express" });
});

router.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  console.log(username);
  console.log(password);
  // WHERE username = ? AND password = ?', [username, password]
  if (username && password) {
    connection.query(
      "SELECT * FROM customer",
      function (error, results, fields) {
        if (error) {
          response.sendStatus(500);
        } else {
          // if (results > 0) {
          // request.session.loggedin = true;
          // request.session.username = username;

          //   console.log(results.length);
          // } else {

          // }
          const rounds = 10;
          const hashPassword = async () => {
            const hash = await bcrypt.hash(password, rounds);
            console.log(hash);
            console.log(await bcrypt.compare(password, hash));
          };
          hashPassword();
          response.redirect("/home");
          console.log(results);
        }
        // response.send("Incorrect Username and/or Password!");
        response.end();
      }
    );
  } else {
    // response.send("Please enter Username and Password!");
    response.end();
  }
});

// document.addEventListener("load",()=>{
//   var first = document.getElementsByClassName("box");
//   first.outerHTML = "<strong>Cities</strong>";

//   // (B2) WILL STILL BE A <P>, BUT CONTENT WILL BE CHANGED.
//   var second = document.getElementById("second");
//   second.innerHTML = "<u>FOO</u> <i>BAR</i>";
// })

router.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  console.log(username);
  console.log(password);
  // WHERE username = ? AND password = ?', [username, password]
  if (username && password) {
    connection.query(
      "SELECT * FROM customer",
      function (error, results, fields) {
        if (error) {
          response.sendStatus(500);
        } else {
          // if (results > 0) {
          // request.session.loggedin = true;
          // request.session.username = username;

          //   console.log(results.length);
          // } else {

          // }
          const rounds = 10;
          const hashPassword = async () => {
            const hash = await bcrypt.hash(password, rounds);
            console.log(hash);
            console.log(await bcrypt.compare(password, hash));
          };
          hashPassword();
          response.redirect("/home");
          console.log(results);
        }
        // response.send("Incorrect Username and/or Password!");
        response.end();
      }
    );
  } else {
    response.end();
  }
});




router.use(function (req,res,next) {
  console.log("/auther" + req.method);
  next();
});
router.post("/auther", function (request, response) {
  console.log(request.body);

  var data = {};
  data = request.body;
  console.log(data);

  var sql = "INSERT INTO city (city) VALUE ('" + data.City + "')";
    connection.query(sql, function (error, result) {
      // if (error) {
      //   throw error;
      // };
      // response.sendStatus(200);
      // response.redirect("/home") TOP 1 city;
      // console.log(results);
      connection.query( "SELECT * FROM city  " , function(error, result){
        // connection.query( "SELECT MAX(Id) FROM city  " , function(error, result){
          console.log(result);
          response.json( {data: result});
        }) 
        response.json( {data: result});
        // response.render("home", {data: result});
      // response.render("home", { title: "Express" });

       console.log("1 record inserted")
     }) 
     
     
  response.render("home", { title: "Express" });
})
 
router.use(function (req,res,next) {
  console.log("/autherer" + req.method);
  next();
});
router.post("/autherer", function (request, response) {
  var data = {};
  data = request.body;
  console.log(data);

  //  var addname = request.body;
  //  var addemail = request.body;
  // var addphone = request.body;

  var sql = "INSERT INTO vendor (name , email , phone) VALUES ('" + data.Name + "','" + data.Email + "'," + data.Phone + ")";
  connection.query(sql, function (error, result) {
    response.render("vender", { title: "Express" });  
  });
  // var ans = connection.query("SELECT * FROM vendor");
  connection.query( "SELECT TOP 1 city FROM city  " , function(error, result){
    console.log(city)
  }) 
  response.render("home", { title: "Express" }); 
  
});


 

module.exports = router;
