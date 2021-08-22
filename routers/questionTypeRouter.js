const Router = require('express').Router;
const questionTypeRepository = require('../repositories/questionTypeRepository')

const questionTypeRouter = Router();
questionTypeRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await questionTypeRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const question_type = {
                question_id: req.body.question_id,
                type_id: req.body.type_id
            };
            res.send(await questionTypeRepository.post(question_type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
questionTypeRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await questionTypeRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const question_type = {
                question_id: req.body.question_id,
                type_id: req.body.type_id
            };
            res.send(await questionTypeRepository.put(id, question_type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await questionTypeRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
    module.exports = questionTypeRouter