const mysql = require('mysql2');

class initialiseDatabase {
    constructor (data) {
        this.data = data
        this.db = null
    }

    validate() {

        const { host, user, password, database} = this.data;
        if ( !host || !user || !password || database )
        throw new Error('Database login details are invalid');

        return;
    }

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
