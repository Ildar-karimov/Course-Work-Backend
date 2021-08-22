const Router = require('express').Router;
const testRepository = require('../repositories/testRepository')

const testRouter = Router();
testRouter.route('/')
    .get(async function(req, res) {
        try {
            res.send(await testRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const test = {
                test_author: req.body.test_author,
                test_name: req.body.test_name,
                test_type: req.body.test_type,
                test_difficult: req.body.test_difficult,
            };
            res.send(await testRepository.post(test));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
testRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await testRepository.get(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .put(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            const test = {
                test_author: req.body.test_author,
                test_name: req.body.test_name,
                test_type: req.body.test_type,
                test_difficult: req.body.test_difficult,
            };
            res.send(await testRepository.put(id, test));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await testRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
    module.exports = testRouter