
## Exercise for WS Docs

This repo contains a very simple server-side application written in JS.
When the application starts, it will look for the PostgreSQL database, and it will try to create a `test_files` table, to use for storing files.
Then, the express server will start listening at the default port (3000).
The routes we have are:
- one GET with a simple HTML form ( using handlebars to render the markup and jquery to connect the form submission to an AJAX call )
- one POST that accepts the incoming files from the form submission


## Requirements
It requires a PostgreSQL database running.
Env variables will be used from `node-postgres`.
For example:
```
  PGUSER=dbuser \
  PGHOST=database.server.com \
  PGPASSWORD=secretpassword \
  PGDATABASE=mydb \
  PGPORT=3211 \
  npm run start
```


## Run
- do `npm i` to install all npm dependencies
- make sure a PostgreSQL database is available
- run with `npm run start`
- upload form should be available at `http://localhost:3000/upload-multi`

