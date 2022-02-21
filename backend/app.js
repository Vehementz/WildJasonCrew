
const connection = require('./db-config');
const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index.routes');


const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
  } else {
    console.log('connected as id ' + connection.threadId);
  }
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));




app.use(cors(corsOptions))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader( 'Access-Control-Expose-Headers', 'Content-Range')

     res.setHeader('Content-Range','posts 0-10/20')

    // Pass to next layer of middleware
    next();
});

app.use('/api', router);
app.get("/", (req, res) => {
    res.send("Welcome in the Backend projet 3");
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

  