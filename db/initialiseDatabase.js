// require the npm mysql2 package
const mysql = require('mysql2');

// create a class to connect to the mysql database
class initialiseDatabase {
    constructor (data) {
        this.data = data
        this.db = null
    }
// checking to make sure the details entered into the new instance of the class are correct
    validate() {

        const { host, user, password, database} = this.data;
        if ( !host || !user || !database )
        throw new Error('Database login details are invalid');

        return;
    }
// this function runs the automated connection command in the mysql2 package
    connect() {

        this.validate();

        const { host, user, password, database} = this.data;

        this.db = mysql.createConnection(
            {
              host: host,
              user: user,
              password: password,
              database: database
            },
            console.log(`\x1b[43mConnected to the employee_db database.`)
          );
    }

}

module.exports = initialiseDatabase;
