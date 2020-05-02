var express = require('express');
var app = express();
var path = require('path');

const bodyParser = require('body-parser');

var mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // this is used for parsing the JSON object from POST


app.use(express.static('./'));

// viewed at http://localhost:8080
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/data', function (req, res) {
    console.log('req.body', req.body);
    const term = req.body.term;
    console.log('term', term);
    const connection = mysql.createConnection({
        host: '192.168.2.24',
        user: 'pi',
        password: 'e22woDdH9_aD3T*Z',
        database: 'example'
    });
    let users = [];

    connection.connect();
    const query = `SELECT first_name, last_name FROM user WHERE first_name like '%${term}%';`;
    // const query = `SELECT first_name, last_name FROM user first_name LIKE '%a' AND true; # %';`;
    // const query = `SELECT * FROM user `;

    connection.query(query, function (err, rows, fields) {
        // console.log('rows', rows);
        // console.log('fields', fields);
        if (err) {
            console.log(err);
        }

        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                let currentUser = rows[i];
                console.log('currentUser', currentUser);
                // users.push(currentUser);
                users.push(currentUser);
            };
            // console.log('The solution is: ', row)

            console.log('users', users);
            res.json(users);
        }
    })

    connection.end();
});

app.listen(8080);