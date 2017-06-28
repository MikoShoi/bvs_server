const express       = require('express');
const logger        = require('morgan')('short');

const postRouter    = require('./routers/postRouter');
const getRouter     = require('./routers/getRouter');

//--create instance of server
const app = express();

//--set middlewire's and route's
app.use(logger);
app.use(getRouter);
app.use(postRouter);

//--and then run server
app.listen( 2326, () => console.log("Server is running\n") );
