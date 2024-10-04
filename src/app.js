import express, {json} from 'express';

const api = express();

api.use(json())

const port = 5000;

const items = []

api.post('/items', (req, res) => {
    const {name, quantity, type} = req.body;
    const verificaNomeRepetido = items.find((item) => item.name === name);

    if(verificaNomeRepetido){
        return res.status(409).send('Não é possível salvar dois produtos com o mesmo nome')
    }

    if(!name || !quantity || !type){
        return res.status(422).send("Todos os campos precisam ser enviados")
    }
    items.push({id: items.length + 1, name, quantity, type})
    res.status(201).json({name, quantity, type})
} )

api.get('/items', (req, res) => {
    const tipoEspecifico = req.query.type;

    if(tipoEspecifico){
       
        const arrayComTipoEspecifico = items.filter((item) => item.type.toLowerCase().includes(tipoEspecifico))
        if(!arrayComTipoEspecifico){
            return res.status(404).json([]);
        }
        return res.status(200).json(arrayComTipoEspecifico);
    }

    res.status(200).json(items)
})


api.listen(port, () => console.log(`Rodando na porta ${port}`))