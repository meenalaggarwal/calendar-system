var express = require('express');
var router = express.Router();
var colors = require('colors');
var dbQuery = require('../DB');

/**
 * @swagger
 * /v1/appointments:
 *   post:
 *     tags:
 *       - Appointments
 *     description: New Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Title
 *         in: body
 *         required: true
 *         type: string
 *       - name: description
 *         description: Description
 *         in: body
 *         required: true
 *         type: string
 *       - name: date
 *         description: Appointment Date
 *         in: body
 *         required: true
 *         type: string
 *       - name: startTime
 *         description: Start Time
 *         in: body
 *         required: true
 *         type: string
 *       - name: End Time
 *         description: End Time
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully Created
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *       400:
 *         description: Error Creating Appointment
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: object
 */
// new appointment
router.post('/', function(req, res) {
    var db = req.app.db;
    if (req.body.userId && req.body.date && req.body.startTime && req.body.endTime && 
        req.body.title && req.body.description) {
        dbQuery.createAppointment(db, req.body, function(err, newDoc) {
            if(err) {
                console.log(colors.red('Error inserting document: ' + err));
                return res.status(400).send({err: err});
            } else {
            	console.log('Succesfully created appointment');
                return res.status(200).send({data: 'Succesfully added'});
            }
        });
    } else {
        return res.status(400).send({err: 'Invalid Data'});
    }
});

/**
 * @swagger
 * /v1/appointments/{appointmentId}:
 *   put:
 *     tags:
 *       - Appointments
 *     description: Update Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description: Title
 *         in: body
 *         type: string
 *       - name: description
 *         description: Description
 *         in: body
 *         type: string
 *       - name: date
 *         description: Appointment Date
 *         in: body
 *         type: string
 *       - name: startTime
 *         description: Start Time
 *         in: body
 *         type: string
 *       - name: End Time
 *         description: End Time
 *         in: body
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully Updated
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *       400:
 *         description: Error Updating Appointment
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: object
 */
// update appointment
router.put('/:appointmentId', function(req, res) {
    var db = req.app.db;
    dbQuery.updateAppointment(db, req.body, req.params.appointmentId, function(err, newDoc) {
        if(err) {
            console.log(colors.red('Error fetching document: ' + err));
            return res.status(400).send({err: err});
        } else {
            console.log('Succesfully updated');
            return res.status(200).send({data: 'Succesfully updated'});
        }
    });
});


/**
 * @swagger
 * /v1/appointments:
 *   get:
 *     tags:
 *       - Appointments
 *     description: Get Appointment
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: UserId
 *         in: query
 *         required: true
 *         type: string
 *       - name: date
 *         description: Date
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully fetched
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: Error fetching Appointment
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 */
// get appointments
router.get('/', function(req, res) {
    var db = req.app.db;
    if (req.query.userId && req.query.date) {
        if (new Date(req.query.date) !== "Invalid Date") {
            dbQuery.getAppointment(db, req.query.userId, req.query.date, function(err, newDoc) {
                if(err) {
                    console.log(colors.red('Error fetching document: ' + err));
                    return res.status(400).send({err: err});
                } else {
                    console.log('Succesfully fetched');
                    return res.status(200).send(newDoc);
                }
            });   
        } else {
            return res.status(400).send({err: 'Invalid Date'});
        }
    } else {
        return res.status(400).send({err: 'Invalid Data'});
    }
});

module.exports = router;
