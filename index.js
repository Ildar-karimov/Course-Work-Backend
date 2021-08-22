const express = require('express');
const cors = require('cors');

const questionRouter = require('./routers/questionRouter');
const typeRouter = require('./routers/typeRouter');
//const questionTypeRouter = require('./routers/questionTypeRouter');
const testRouter = require('./routers/testRouter');
const resultRouter = require('./routers/resultRouter');
const questionTestRouter = require('./routers/questionTestRouter');
const { port } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/question', questionRouter);
app.use('/type', typeRouter);
//app.use('/questiontype', questionTypeRouter);
app.use('/test',testRouter);
app.use('/result', resultRouter);
app.use('/questiontest', questionTestRouter);

app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));