const fs = require("fs");
const pg = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const config = {
  user: "avnadmin",
  password: "AVNS_FC6mAvRkRtd3qi6Sw6G",
  host: "pg-1f538d92-patrimoine-d-b.j.aivencloud.com",
  port: "23226",
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected to PostgreSQL");
});

app.get("/possession", (req, res) => {
  client.query("SELECT * FROM possession", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
    res.status(200).json(result.rows);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
