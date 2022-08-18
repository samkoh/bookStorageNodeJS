const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//USE THIS DURING DEVELOPMENT
// var corsOptions = { origin: "http://localhost:8081" };
//USE THIS WHEN BOTH REACT AND NODE TO USE SAME PORT
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

// MIDDLEWARE FUNCTION TO LET BOTH REACT AND NODE TO USE SAME PORT
const path = __dirname + '/app/views/';
app.use(express.static(path));

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Connection Settings
const db = require("./app/models");
db.mongoose.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

//simple route
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to Sam application." });
// });

// MIDDLEWARE FUNCTION TO LET BOTH REACT AND NODE TO USE SAME PORT
app.get('/', function (req, res) {
    res.sendFile(path + "index.html");
});

require("./app/routes/tutorial.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

