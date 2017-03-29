const _ = require('lodash');
const Promise = require('promise');
const request = require('request');
const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Rx = require('rxjs/Rx');

const log = require('simple-node-logger').createSimpleFileLogger('project.log');

const JiraService  = require('./services/JiraService');

const issuesReceived = payload => ({type: 'DATA_RECEIVED', payload});
const issuesReceivedFailed = () => ({type: 'DATA_RECEIVED_FAILED'});
const filtersReceived = payload => ({type: 'FILTERS_RECEIVED', payload});

console.log('Starting app..');
console.log('Reading settings file!');
const settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

const testData = JSON.parse(fs.readFileSync('sample-data-full.json', 'utf8'));

const testPromise = () => {
  return new Promise(
    function(resolve, reject) {
      setTimeout(() => {
        resolve('Resolved test data!');
      }, 100);
    }
  );
};

const saveDataToFile = (data) => {
  fs.writeFile(`sample-data-last.json`, JSON.stringify(data), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

http.listen(settings.port, function () {
  console.log(`Storyboard backend listening on port ${settings.port}!`);
});

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode, serving client');
  app.use(express.static('client/build'));
}

const rooms = new Map();

const updateRoom = (room, roomName) => {
  if (room.sockets.size > 0) {
    JiraService.getIssues(roomName, settings).subscribe(
      data => {
        console.log(`Emit data to ${roomName}`);
        //const data = testData;
        room.data = data;
        io.to(roomName).emit("action", issuesReceived(data));
      },
      reason => {
        console.log(`Error`);
        io.to(roomName).emit("action", issuesReceivedFailed());
      }
    );
  };
};

const updateRooms = () => rooms.forEach(updateRoom);
setInterval(updateRooms, settings.refreshIntervalSeconds * 1000);

const logRoomsInfo = () => {
  console.log('Rooms info:');
  rooms.forEach((value, key, map) => {
    console.log(`  ${key}: ${Array.from(value.sockets).join(', ')}`);
  });
};

io.on('connection', socket => {
  let roomName;
  socket.on('action', action => {
    if (action.type === 'server/SUBSCRIBE'){
      roomName = action.payload;
      if (!rooms.has(roomName)) {
        rooms.set(roomName, {
          sockets: new Set(),
          data: null,
        });
      }
      const room = rooms.get(roomName);
      room.sockets.add(socket.id);
      socket.join(roomName);
      console.log(`Client ${socket.id} subscribed to ${roomName}`);
      logRoomsInfo();

      if (room.sockets.size === 1) {
        updateRoom(room, roomName);
      } else if (room.sockets.size > 1 && room.data) {
        socket.emit('action', issuesReceived(room.data));
        console.log(`Emit cached data to ${socket.id}`);
      }
    } else if (action.type === 'server/REQUEST_FILTERS') {
      console.log(`Emit filters to ${socket.id}`);
      socket.emit('action', filtersReceived(settings.filters));
    }
  });
  socket.on('disconnect', function() {
    socket.leaveAll();
    if (roomName) {
      rooms.get(roomName).sockets.delete(socket.id);
      console.log(`Client ${socket.id} disconnected`);
      logRoomsInfo();
    }
  });
});
