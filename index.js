var express = require("express");
var app = express();
var morgan = require("morgan");
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/upload", express.static("upload"));
var connection = mysql.createConnection({
  host: "db4free.net",
  user: "assesment",
  password: "assesment",
  database: "assesment"
});

require("./imageUpload")(app);

connection.connect(err => {
  if (!err) {
    app.listen(8080, () => {
      console.log("App is listening at 8080");
    });
  } else {
    console.log("can not connect........." + err);
  }
});

// app.listen(8080, () => {
//   console.log("App is listening at 8080");
// });

app.post("/api/create_data", (req, res) => {
  var amount = req.body.amount;
  var date = req.body.date;
  const query = "INSERT INTO form_data (amount, date, u_id) VALUES (?,?,?)";
  connection.query(query, [amount, date, 1], (err, rows, fields) => {
    if (!err) res.json(rows);
    else res.send(err);
  });
});

app.get("/api/getData", (req, res) => {
  const query =
    "SELECT form_data.date,form_data.amount ,images.image FROM form_data  INNER JOIN users  ON users.id = form_data.u_id INNER JOIN images ON users.id = images.u_id ORDER BY form_data.date";
  connection.query(query, (err, rows, fields) => {
    if (!err) res.json(rows);
    else res.send(err);
  });
});
