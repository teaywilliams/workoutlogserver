const Sequelize = require('sequelize');
const sequelize = new Sequelize('projects-workoutlog', 'postgres', 'password', {
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
function() {
    console.log('Connected to projects-workoutlog');

},
function(err){
    console.log(err);
});

module.exports = sequelize;