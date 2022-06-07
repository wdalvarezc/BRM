require('dotenv').config();

module.exports = {
    dbUser : process.env.DB_USER,
    dbName : process.env.DB_NAME,
    dbPassword : process.env.DB_PASSWORD,
    port : process.env.PORT,
    host : process.env.HOST,
}