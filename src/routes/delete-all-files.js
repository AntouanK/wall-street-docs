const { client } = require("../db.js");

//
//
const handler = (req, res, next) => {
  client
    .query("DELETE FROM test_files;")
    .then(_ => {
      res.end();
      next();
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
      next();
    });
};

module.exports = handler;
