import express, {json} from 'express';

const api = express();

api.use(json())

const port = 5000;

const items = []

function validarId(id) {
    const regex = /^[0-9]+$/; 
    return regex.test(id); 
}

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

api.get('/items/:id', (req, res) => {
    const id = req.params.id;

    if(id < 1 || !validarId(id)){
        return res.status(400).send('Id invalido')
    }

    const retornaItemComId = items.find((item) => item.id === Number(id));
    
    if(!retornaItemComId){
        return res.status(404).send('Esse id não existe');
    }

    res.status(200).json(retornaItemComId);
})


api.listen(port, () => console.log(`Rodando na porta ${port}`))