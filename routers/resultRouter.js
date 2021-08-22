const Router = require('express').Router;
const resultRepository = require('../repositories/resultRepository')

const resultRouter = Router();
resultRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await resultRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const result = {
                test_id: req.body.test_id,
                result_author: req.body.result_author,
                result_mark: req.body.result_mark
            };
            res.send(await resultRepository.post(result));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
resultRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await resultRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const result = {
                result_author: req.body.result_author,
                result_mark: req.body.result_mark
            };
            res.send(await resultRepository.put(id, result));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await resultRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
    resultRouter.route('/test/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await resultRepository.getByTestId(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    module.exports = resultRouter