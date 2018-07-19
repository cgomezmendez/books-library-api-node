Athena API
==================

This is a test application written for GBH.

__Athena__ is an API for a book's library with the following features:

* Users can list available books
* Users are able to read each book page in the desired format
* Books are available in plain text and HTML

Note: in a future we want to add support to more reading formats and be able to connect with other API that provides books.


Requirements:
------------

* [NodeJs 8.11.3+](https://nodejs.org/en/download/)
* [Yarn 1.7+](https://yarnpkg.com/en/docs/install)


How to setup
----------------------

* edit config/database.json to reflect your database settings (by default sqlite ./db.sqlite) this is only for database seed and migrations.
* edit src/api/config/server.js to reflect your database, pagination, host port and url settings
* run yarn install (to install all dependencies)
* run yarn migrate to run migrations
* run yarn seed to run all seeds
* run yarn test to run all unit tests (optional)
* run yarn start-dev to start the server
