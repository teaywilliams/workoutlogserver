require("dotenv").config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let user = require('./controllers/usercontroller');
let log = require('./controllers/logcontroller');

sequelize.sync();
// sequelize.sync({force: true});

app.use(express.json());

// this creates the start of our URL/request endpoint
// http://localhost:4000/user
app.use('/user', user);

// this creates the start of our URL/request endpoint
// http://localhost:4000/log
app.use('/log', log);

app.listen(4000, function(){
    console.log('App is listening on port 4000');
})