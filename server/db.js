const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "didi",
    host: "localhost",
    port: 5400,
    database: "perntodo"
});

module.exports = pool;