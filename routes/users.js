var express = require('express');
var router = express.Router();
var colors = require('colors');
var dbQuery = require('../DB');

/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     tags:
 *       - Users
 *     description: Register User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: username
 *         description: username
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully Registered
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *       400:
 *         description: Error Logging In
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: object
 */
// register new user
router.post('/register', function(req, res) {
    var db = req.app.db;
    if (req.body.name && req.body.username && req.body.password) {
        dbQuery.createUser(db, req.body, function(err, newDoc) {
            if(err) {
                console.log(colors.red('Error inserting document: ' + err));
                return res.status(400).send({err: err});
            } else {
            	console.log('Succesfully added users');
                return res.status(200).send({data: "Succesfully added"});
            }
        });
    } else {
        return res.status(400).send({err: 'Invalid Data'});
    }
});

/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     tags:
 *       - Users
 *     description: Login User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: username
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         description: password
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully Logged In
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *       400:
 *         description: Error Logging In
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 */
// login user
router.post('/login', function(req, res) {
    var db = req.app.db;
    if (req.body.username && req.body.password) {
        dbQuery.loginUser(db, req.body, function(err, newDoc) {
            if(err || newDoc.length === 0) {
                if (newDoc.length === 0) {
                    err = "Invalid User"
                }
                console.log(colors.red('Error fetching document: ' + err));
                return res.status(400).send({err: err});
            } else {
                console.log('Succesfull login');
                return res.status(200).send(newDoc[0]);
            }
        });
    } else {
        return res.status(400).send({err: 'Invalid Data'});
    }
});

module.exports = router;
