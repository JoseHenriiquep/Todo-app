const express = require("express");
const cors = require("cors");
const dbConnect = require('./config/db')
const auth = require('./routes/auth')
const tasks = require('./routes/tasks')

const app = express();

//Configurando resposta JSON
app.use(express.json());
app.use(cors());
app.use('', auth);
app.use('', tasks);

//Conexão com o banco
dbConnect()

app.listen(3000, (error) => {
    if (error) {
      console.log("Erro ao subir app", error)  
      return
    } 
    console.log("Subiu a app")
})