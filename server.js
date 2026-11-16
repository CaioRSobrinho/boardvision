//variaveis que utilizam 
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

//Dis ao Node para servir os arquivos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=> {
    console.log(`Servidor Boardvision rodando em http://localhost:${PORT}`);
});