const mongoose = require("mongoose");
require('dotenv').config();

//Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Conexão
const db =  async () => {
    try {
        await  mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.kw4rj.mongodb.net/?retryWrites=true&w=majority`)
        console.log("Conectou ao banco")
    } catch (error) {
        console.log("O banco nao subiu: ", error)
    } 
}

module.exports = db;