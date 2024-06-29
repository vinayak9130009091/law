var express = require("express");
var app = express();
var sql = require("mssql");

// config for your database
var config = {
  user: "microte2_Azuretesting",
  password: "3vWnsz5yF9id0Lw#a",
  server: "103.120.176.15",  // Use IP address for now
  database: "microte2_testing",
  options: {
    encrypt: true,  // Use this if your SQL Server is configured to use SSL/TLS
    trustServerCertificate: true  // Use this to bypass SSL certificate validation
  }
};

// connect to your database
sql.connect(config).then(pool => {
  if (pool.connecting) {
    console.log('Connecting to the database...');
  }
  if (pool.connected) {
    console.log('Connected to the database.');
  }

  app.get("/", async function (req, res) {
    try {
      // create Request object
      let request = pool.request();
      // query to the database and get the records
      let result = await request.query("select * from AppUser");
      // send records as a response
      res.send(result.recordset);
    } catch (err) {
      console.error('SQL error', err);
      res.status(500).send('Database query error');
    }
  });

  var server = app.listen(5000, function () {
    console.log("Server is running on port 5000.");
  });

}).catch(err => {
  console.error('Database connection failed', err);
});
