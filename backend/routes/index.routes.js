
const router = require('express').Router();
const crewRouter = require('./crew.routes');



router.use('/crew', crewRouter);



module.exports = router;