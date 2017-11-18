import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';

import isEmpty from 'lodash/isEmpty';
//import validateInput from "../shared/validations/login";

let router = express.Router();
let r = require('rethinkdb');

function validateInput(data,otherValidations){
    let error=otherValidations(data);
}


router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username', 'email' ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});


router.post('/', (req, res) => {
  console.log('reqbody',req.body);
  const {errors,isValid} = commonValidations(req.body);

  if(isValid) {
    //res.json(true);
    const {username, password, timezone, email}=req.body;
    const password_digest = bcrypt.hashSync(password,10);
    console.log('save',password_digest,username);

      r.connect( {host: 'localhost', port: 28015, db:'app1b'}, function(err, conn) {
          if (err) {
              throw err;
          }else {
              console.log("connection to database success!");
              //conn.use('app1b'); //switch database
              r.table("users").insert({ //insert
                  username:username,
                  password: password_digest,
                  email: email,
                  timezone: timezone
              }).run(conn, (err,ret)=>{
                  if(err){
                      console.log('rethink insert err',err);
                      res.status(400).json({invalid:true});
                      //res.status(400).json({email:"cant save",isValid:false});
                  }else{
                      res.json(true);
                  }
              })
          }
          //conn.close(()=>{ });

      });
  }else{
    res.status(400).json(errors);
  }

});

export default router;
