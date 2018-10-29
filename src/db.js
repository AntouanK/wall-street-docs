const { Client } = require("pg");
const client = new Client({
  user: process.env.PGUSER || "postgres",
  database: process.env.PGDATABASE || "postgres"
});

//
client
  // connect to DB ( we use defaults for host/port/user/db )
  .connect()
  // create a table to save our files
  .then(_ =>
    client.query(
      "CREATE TABLE test_files (name text, data bytea, created_at INT8)"
    )
  )
  .catch(err => {
    if (err && err.message === 'relation "test_files" already exists') {
      // ignore this. means the table already exists
      return err;
    }
    console.error(err);
  });

module.exports = { client };
