// const express = require('express');
// const app = express();
//
// const bodyParser = require('body-parser');
//
// const openRouter = require('./api/open.js');
//
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
//
// app.use('/api', openRouter);
//
//
// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//
//     next(error);
// })
//
//
// app.use((req, res, next) => {
//     res.status = error.status || 500;
//     req.json({
//         error: error.message
//     })
//
// })
//
// module.exports = app;

const apiRouter = require('./routes/api');

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true})); //extended false means you can't post "nested object"
app.use(bodyParser.json());

app.use('/api', apiRouter);


module.exports = app;