# Stotles work sample assignment

## Getting started

This sample codebase consists of a separate client & server code.

It's set up in a simple way to make it as easy as possible to start making changes,
the only requirement is having recent versions of `node` & `npm` installed.

This is not a production ready configuration (nor production ready code),
it's only set up for easy development, including live reload.

To run the client bundler:

```
cd client
npm install
npm run dev
```

The processed code will be available at http://localhost:3001

To start the server:

```
cd server
npm install
npm run dev
```

The server will be available at http://localhost:3000 - the page is automatically configured
to use the assets served by vite on port 3001.

You should see something similar to this page:

![Search page](./screenshot.png)

### Disabling/Enabling TypeScript

If you prefer to completely disable TypeScript for a file, add `// @ts-nocheck` on the first line.
If on the other hand you'd like to enable strict type checking, modify `tsconfig.json` according to your needs.

Note that you can import plain JavaScript files that won't be fully typechecked.

### Browsing the database

You should start by looking at the migration in `./migrations` folder.
If you prefer to browse the DB using SQL, you can use the sqlite command line (just run `sqlite3 ./db.sqlite3`)
or any other SQL client that supports sqlite.

If for any reason the database becomes unusable, you can rebuild it using `./reset_db.sh` script`.

## The task

All the instructions are available [here](https://www.notion.so/stotles/Full-stack-software-engineer-work-sample-assignment-ae7c64e08f2a42a097d16cee4bc661fc).


## Thoughts and considerations

It was a good challenge to work on. Alot of interaction with the API and querying the database. I learnt new technologies such as sequalize, and AntD components.

### Some of the challenges I faced

Mostly time constraints. I was not able to implement everything I have in mind, however I have a working solution that meets the requirements.

### What I would add if I had more time

* The UI structure could have been better. I would have liked to implement a better UI structure and make it more user friendly.
* Separate the logic into composable hooks which can be reused in other components.
* Instead of using component start for the filters, I would have added the filters to the URL so that the user can share the URL with the filters applied, bookmark it, refreshing the page without loosing the filters and also having a shared state between the components.
* Instead of hardcoding the page size, I would have added a dropdown to select the page size.
* Something to also add is the better debouncing of the text search. The solution currently is to make a request if the text length is greater than 3. A better solution would be to debounce the text search so that the request is only made after the user has stopped typing for a certain amount of time.

In the backend:

* Handling the text search currently wouldn't be efficient for large datasets. I would have implemented a full text search using Postgres or ElasticSearch.
* The above would be implemented for the buyers selector as well.


