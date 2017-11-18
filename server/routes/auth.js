import express from 'express';
//import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
//import config from '../config';

let router = express.Router();
let r = require('rethinkdb');
router.post('/', (req, res) => {
  const { identifier, password } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);

  /*User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });*/

    r.connect( {host: 'localhost', port: 28015, db:'app1b'}, function(err, conn) {
        if (err) {
            throw err;
        }else {
            console.log("connection to database success!");
            //conn.use('app1b'); //switch database
        }
        console.log('identifier',identifier);

        r.table('users').filter({username: identifier}).run(conn, (err,cursor)=>{
            //console.log('logincount',cursor);
            if(err) {
                //return next(err);
                next(err);
                res.status(400).json({'form':'unable to retrieve data'});
            }
            cursor.toArray(function(err, result) {
                if(err) {
                    next(err);
                    res.status(400).json({'form':'zero result in when finding your user credentials'});
                }
                if(result.length>0){
                    if(bcrypt.compareSync(password,result[0].password)){
                        console.log("test1232");
                        const token=jwt.sign({
                            id: result[0].id,
                            username: result[0].username
                        },'ecryptkey');
                        res.json({token});
                        return;
                    }
                    res.status(400).json({'form':'Invalid Password'});
                    return;
                }
                res.status(400).json({'form':'user credential not exist'});

            });

            /*if(cursor > 0){
                //Retrieve all the todos in an array.
                console.log(arr);
                const token=jwt.sign({
                    id: 'temporary_id', //need to change this in id
                    username: identifier
                },'ecryptkey');

                console.log('token',token);
                console.log('password',password);
                console.log('password',password_digest);
                res.json(token);
              /*if(bcrypt.compareSync(password,user.get(password_digest))){
                console.log("test1232");
                res.json(true);
              }else{
                res.status(400).json({'form':'Invalid Credentials'});
              }*/
            /*}else{
              res.status(400).json({'form':'Invalid Credentials'});
            }*/

        });
        //conn.close(()=>{ });
    });
});

export default router;
