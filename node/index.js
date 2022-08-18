const express = require('express');

const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const createSql = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, name VARCHAR(255))`;
connection.query(createSql);

connection.end();

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);
  
  const insertSql = `INSERT INTO people(name) values('Lucas')`;
  connection.query(insertSql);

  const selectSql = `SELECT * FROM people`;
  connection.query(selectSql, (err, results) => {
    if (err) {
      res.send(`<h1>Full Cycle Rocks!</h1>`);
    } else {
      
      const strNames = results.map(result => result.name).join('<br />');

      res.send(`<h1>Full Cycle Rocks!</h1> <br/> <h2>${strNames}</h2>`);
    }
  });

  connection.end();
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});