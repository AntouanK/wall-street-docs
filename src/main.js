const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
let server;
const port = 3000;

// routes
const uploadMulti = require("./routes/upload-multi.js");
const uploadFiles = require("./routes/upload-files.js");
const availableFiles = require("./routes/available-files.js");
const deleteAllFiles = require("./routes/delete-all-files.js");

app.get("/upload-multi", uploadMulti);
app.post("/upload-files", upload.array("files"), uploadFiles);
app.get("/available-files", availableFiles);
app.get("/delete-all-files", deleteAllFiles);

// start server
const main = () => {
  console.log("-------------------- main");
  server = app.listen(port, () =>
    console.log(`express app listening on port ${port}!`)
  );
};

//
//  close server, and exit process
const close = () => {
  server.close();
  process.exit(0);
};

module.exports = { main, close };
