const multer = require("multer");
var mysql = require("mysql");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
module.exports = app => {
  var connection = mysql.createConnection({
    host: "db4free.net",
    user: "assesment",
    password: "assesment",
    database: "assesment"
  });

  app.post("/api/uploadImage", upload.array("image"), (req, res, next) => {
    const name = "http://localhost:8080/" + req.files[0].path;
    const query = "INSERT INTO images (image, u_id) VALUES (?,?)";
    connection.query(query, [name, 1], (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.send(err);
    });
  });
};
