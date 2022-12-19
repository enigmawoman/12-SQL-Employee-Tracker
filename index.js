// require the runStartQuestions function from the runQuestions.js file
const figlet = require("figlet");
const runMenuQuestions = require('./src/runQuestions');
//calling the runstartquestions file
function init () {
        figlet.text("School \n Staff \n Tracker", function (err, data){
        console.log(data)
        })

        runMenuQuestions();
}
init();

