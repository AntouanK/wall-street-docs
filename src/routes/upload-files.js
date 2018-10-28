const { client } = require("../db.js");
const fs = require("fs");

const uploadFile = ({ filePath, fileName }) =>
  new Promise((resolve, reject) => {
    // read the file
    fs.readFile(filePath, "hex", function(err, fileData) {
      fileData = "\\x" + fileData;
      // make query to insert it into db
      client.query(
        "INSERT INTO test_files (name, data, created_at) values ($1,$2,$3)",
        [fileName, fileData, Date.now()],
        function(err /*, result*/) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
          // remove temporary uploaded file. TODO : handle callback
          fs.unlink(filePath, err => {
            if (err) {
              console.error(err);
            }
          });
        }
      );
    });
  });

//
//
const handler = (req, res, next) => {
  Promise.all(
    req.files.map(fileInfo => {
      return uploadFile({
        filePath: fileInfo.path,
        fileName: fileInfo.originalname
      });
    })
  )
    .then(_ => {
      res.end("ok");
      next();
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
      next();
    });
};

module.exports = handler;
