import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';
import users from './routes/users';
import auth from './routes/auth';
import send from './routes/send';
import userlist from './routes/userlist';

var config = require("./config.js");

let app = express();

var r = require('rethinkdb');
var rdbConn;

app.use(bodyParser.json());
app.use('/api/users',users);
app.use('/api/auth',auth);
app.use('/api/userlist',userlist);
app.use('/api/send',send);


const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'));
});


app.listen(3001,()=>console.log("running on localhost:3001"));

