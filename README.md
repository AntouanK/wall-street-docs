
# Exercise for Wall Street Docs

*29 Oct 2018 - Antonis Karamitros - http://goo.gl/iLHAb0*

This repo contains a very simple server-side application written in JS.
When the application starts, it will look for the PostgreSQL database, and it will try to create a `test_files` table, to use for storing files.
Then, the express server will start listening at the default port (3000).
The routes we have are:
- GET `/upload-multi` with a simple HTML form ( using handlebars to render the markup and jquery to connect the form submission to an AJAX call )
- POST `/upload-files` that accepts the incoming files from the form submission
- GET `/available-files` to get a JSON with details on all saved files
- GET `/delete-all-files` to delete all files saved in the database

The "front-end" is just a simple multiple-file upload input element and some extra things like a submit button, some indicator messages and links to display uploaded files, or to delete them.
We can obviously expand on the front-end, and give more details for the files selected, for the uploading progress, and links to download the saved files.
I assumed it's not needed for the purposes of this exercise.

## Requirements
It requires a PostgreSQL database running.
Env variables will be used from [`node-postgres`](https://node-postgres.com/).
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

## Test
- do `npm run test` to run the tests. ( database connection is again required )

## Tech stack
- Node.js
    - express v4
    - handlebars v4
    - multer
    - (db) pg
    - (test) tape \ tap-spec \ superagent
- PostgreSQL


## Front-end screenshot
This is how the (primitive!) `/upload-multi` page should look like

![screenshot_2018-10-29_08-52-42](https://user-images.githubusercontent.com/4569111/47639010-26d68c80-db58-11e8-8fae-328668ab36c8.png)
