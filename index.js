//require the npm package figlet for initialisation text.
const figlet = require("figlet");
// require the runStartQuestions function from the runQuestions.js file
const runMenuQuestions = require('./src/runQuestions');


// this runs on initialisation when "node index.js" is run on the terminal and displays some ascii text
function init () {
        figlet.text("School \n Staff \n Tracker", function (err, data){
        console.log(data)
        })
//calling the runstartquestions file
        runMenuQuestions();
}
init();

