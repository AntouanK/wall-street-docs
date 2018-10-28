const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const port = 3000;

// routes
const uploadMulti = require("./routes/upload-multi.js");
const uploadFiles = require("./routes/upload-files.js");
const availableFiles = require("./routes/available-files.js");

app.get("/upload-multi", uploadMulti);
app.post("/upload-files", upload.array("files"), uploadFiles);
app.get("/available-files", availableFiles);

// start server
const main = () => {
  console.log("-------------------- main");
  app.listen(port, () => console.log(`express app listening on port ${port}!`));
};

module.exports = { main };
