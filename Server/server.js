const express = require('express');
const cors = require('cors');

// const for port number that our express server will run on
const PORT = 3000;

//create an instance of express
const app = express();

//specify bodyParser to handle json data
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
// app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

//to test the get request
app.get('/', function(req, res) {
    res.send('Hello from server');
})

//add an end point to which our angular application will post the form data to
app.post('/enroll', function(req, res){
    console.log(req.body);
    res.status(401).send({"message": "Data received"});
})

//to listen to the request on specied port
app.listen(PORT, function(){
    console.log("Server running on localhost:" + PORT);
});