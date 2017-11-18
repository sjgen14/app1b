import express from 'express';
import commonValidations from '../shared/validations/signup';
import isEmpty from 'lodash/isEmpty';

let router = express.Router();
let r = require('rethinkdb');
var request = require('request');
var text = require('textbelt');

function validateInput(data,otherValidations){
    let error=otherValidations(data);
}

router.post('/', (req, res) => {
  console.log('reqbody',req.body);
    var opts = {
        fromAddr: 'sjgen14@gmail.com',
        fromName: req.body.name,
        region:   'us',  //us //can//intl
        subject:  'sms'
    }
    text.sendText(req.body.number, req.body.message, opts, function(err) {
        if (err) {
            console.log('error',err);
            res.status(400).json({invalid: true});
            return;
        }
    });
  res.json(true);
});

export default router;


/*request.post('https://textbelt.com/text', {
    form: {
        phone: '639075395866',
        message: 'Hello world',
        key: 'b0163dfcc54a6bff92bb5121ae74dd35b54aea75ltmblPyJk4RMJKu25GM',
        b0163dfcc54a6bff92bb5121ae74dd35b54aea75ltmblPyJk4RMJKu25GMelnt54
    },
}, function(err, httpResponse, body) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log(JSON.parse(body));
})*/
