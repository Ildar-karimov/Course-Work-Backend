const Router = require('express').Router;
const questionTestRepository = require('../repositories/questionTestRepository')

const questionTestRouter = Router();
questionTestRouter.route('/')
    .get(async function(req, res) {
        try {
            let question_tests = await questionTestRepository.getAll();
            
            for(let i of question_tests){
                i.question = {
                    "id": i.question_id,
                    "name": i.question_name,
                    "answer": i.question_answer,
                    "type_id": i.type_id,
                    "count_correct": i.count_correct,
                    "count_all": i.count_all,
                    "ontolog": i.ontolog,
                    "block": i.block,
                }
                
                i.test = {
                    "id": i.test_id,
                    "author": i.test_author,
                    "name": i.test_name,
                    "type": i.test_type,
                    "difficult": i.test_difficult,
                }

                delete i.question_id;
                delete i.question_name;
                delete i.question_answer;
                delete i.type_id;
                delete i.count_correct;
                delete i.count_all;
                delete i.ontolog;
                delete i.test_id;
                delete i.test_author;
                delete i.test_name;
                delete i.test_type;
                delete i.test_difficult;
            }

            res.send(await questionTestRepository.getAll());
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .post(async function(req, res) {
        try {
            const question_type = {
                question_id: req.body.question_id,
                test_id: req.body.test_id,
                block: req.body.block
            };
            res.send(await questionTestRepository.post(question_type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
questionTestRouter.route('/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            res.send(await questionTestRepository.get(id));
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
                test_id: req.body.test_id
            };
            res.send(await questionTestRepository.put(id, question_type));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    .delete(async function (req, res){
        try {
            const id = parseInt(req.params.id);
            res.send(await questionTestRepository.remove(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    });
questionTestRouter.route('/test/:id')
    .get(async function(req, res) {
        try {
            const id = parseInt(req.params.id);
            // let question_tests = await questionTestRepository.getByTestId(id);
            
            // for(let i of question_tests){
            //     i.question = {
            //         "id": i.question_id,
            //         "name": i.question_name,
            //         "answer": i.question_answer,
            //         "type_id": i.type_id,
            //         "count_correct": i.count_correct,
            //         "count_all": i.count_all,
            //         "ontolog": i.ontolog,
            //         "block": i.block,
            //     }

            //     delete i.question_id;
            //     delete i.question_name;
            //     delete i.question_answer;
            //     delete i.type_id;
            //     delete i.count_correct;
            //     delete i.count_all;
            //     delete i.ontolog;
            //     delete i.block;
            //}
            res.send(await questionTestRepository.getByTestId(id));
        } catch (err) {
            console.error(err);
            res.status(500).send();
        }
    })
    module.exports = questionTestRouter