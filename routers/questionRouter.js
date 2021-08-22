const Router = require('express').Router;
const questionRepository = require('../repositories/questionRepository')

const questionRouter = Router();
questionRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await questionRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const question = {
                question_name: req.body.question_name,
                question_answer: req.body.question_answer,
                type_id: req.body.type_id,
                count_correct: req.body.count_correct,
                count_all: req.body.count_all,
                ontolog: req.body.ontolog,
            };
            res.send(await questionRepository.post(question));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
questionRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await questionRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const question = {
                question_name: req.body.question_name,
                question_answer: req.body.question_answer,
                type_id: req.body.type_id,
                count_correct: req.body.count_correct,
                count_all: req.body.count_all,
                ontolog: req.body.ontolog,
            };
            res.send(await questionRepository.put(id, question));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await questionRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
    questionRouter.route('/type/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await questionRepository.getByType(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
    questionRouter.route('/q/:id')
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const question = {
                count_correct: req.body.count_correct,
                count_all: req.body.count_all,
            };
            res.send(await questionRepository.put(id, question));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });

    module.exports = questionRouter