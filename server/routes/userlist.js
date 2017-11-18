import express from 'express';

let router = express.Router();
let r = require('rethinkdb');

router.get('/', (req, res) => {
    r.connect({host: 'localhost', port: 28015, db: 'app1b'}, function (err, conn) {
        if (err) {
            throw err;
        } else {
            console.log("connection to database success!");

            r.table('users').filter({username: identifier}).run(conn, (err,cursor)=> {
                //console.log('logincount',cursor);
                if (err) {
                        next(err);
                        res.status(400).json({'form': 'unable to retrieve data'});
                }
                cursor.toArray(function (err, result) {
                    if (err) {
                        next(err);
                        res.status(400).json({'form': 'zero result users'});
                    }
                    if (result.length > 0) {
                        res.json(result[0]);
                        return;
                    }
                    res.status(400).json({'form': 'no record found'});

                });
            })
        }
        //conn.close(()=>{ });

    });
});

export default router;
