Node.js p2p Chat
===

This application is made with Node.js, Express, Socket.io and ejs.
Thanks to Node.js, the chat can handle a lot of simultaneous connections without lag.
To use it, you need Node.js, npm and postman.

## Install the modules :

	- Go to the chat directory and use this command
	- npm install

## Customize the installation :

	- You can change the app port from the server.js third line.

## How to use :

  - Create different users with postman and mongo db schema. Sample user from which you can create new user via postman in mongoDB:
    name: Prince,
    uname: GargPrince,
    password: prince,
    friends: [Jatin, Jolly]
  
  - Schema can be found in app/models/user.js
	
  - node server.js
