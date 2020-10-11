const mysql = require('mysql');
const { Client } = require('pg')
const client = new Client({
    host: 'ec2-54-160-161-214.compute-1.amazonaws.com',
    user: 'odeeoirltmupwn',
    password: '1479ce0b28b97770c371b7e2188e2718c304f621e8c1b3d8329545e9eb73faaa',
    database: 'df0jr1cg8fujnk',
    port: 5432
})
client.connect()

var con = mysql.createConnection({
    host: "sql12.freemysqlhosting.net",
    user: "sql12368611",
    password: 'jLvgXstf4Y',
    database: "sql12368611"
});
con.connect(function (err) {
    if (err) {
        console.log("Error in connection with database");
    }
    else {
        console.log("Conection Established");
        con.query('select time, message from todo', function (err, data) {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                const qry = `insert into notes(title, message) VALUES('${element.time}', '${element.message}')`
                client.query(qry, (err, res) => {
                    if (err) {
                        console.log('err for', err, qry)
                    }
                    else {
                        console.log('inserted')
                    }
                })
            }
        })
    }
})
console.log('done');