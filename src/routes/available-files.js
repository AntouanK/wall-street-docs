const { client } = require("../db.js");

//
//
const rowToFileInfo = row => {
  const createdAt = +row.created_at;
  if (Number.isNaN(createdAt)) {
    throw new Error("created_at is not a number");
  }
  return { name: row.name, createdAt };
};

//
//
const handler = (req, res, next) => {
  client
    .query("SELECT name,created_at FROM test_files")
    .then(response => {
      const files = response.rows.map(rowToFileInfo);
      res.json(files);
      next();
    })
    .catch(err => {
      res.status(500).end();
      next();
    });
};

module.exports = handler;
