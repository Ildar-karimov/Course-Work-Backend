const Router = require('express').Router;
const typeRepository = require('../repositories/typeRepository')

const typeRouter = Router();
typeRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await typeRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const type = {
                type_name: req.body.type_name
            };
            res.send(await typeRepository.post(type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
typeRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await typeRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const type = {
                type_name: req.body.type_name
            };
            res.send(await typeRepository.put(id, type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await typeRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
    module.exports = typeRouter