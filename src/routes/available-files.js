const { client } = require("../db.js");

const handler = (req, res, next) => {
  client
    .query("SELECT name,created_at FROM test_files")
    .then(response => {
      console.log(response);
      const files = response.rows.map(row => {
        return { name: row.name, createdAt: +row.created_at };
      });
      res.json(files);
      next();
    })
    .catch(err => {
      res.status(500).end();
      next();
    });
};

module.exports = handler;
