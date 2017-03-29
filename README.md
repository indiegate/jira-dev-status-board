## Jira dev status board ##

### Requirements:
*  [node.js](https://nodejs.org)

### Install & Development Run
* `npm i && cd client && npm i && cd ..` install dependencies for server and client
* `npm start` run server with nodemon, concurrently run webpack dev server for client
### Production build & Run
* `npm i && cd client && npm i && cd ..` install dependencies for server and client
* `cd client && npm run build && cd ..` build frontend static files
* `npm run prodServe` - run server (backend + serving static files)
### License

Software is released under the [GPL-3.0 license] (http://opensource.org/licenses/GPL-3.0)
