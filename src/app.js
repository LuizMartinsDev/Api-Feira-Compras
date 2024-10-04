import express from 'express';

const api = express();
const port = 5000;

api.get('/',(req, res) => {
    res.send('Hello ')
} )


api.listen(port, () => console.log(`Rodando na porta ${port}`))