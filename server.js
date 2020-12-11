const express = require('express');
const parseToPDA = require('./pda_sim/parse_cnfg.js');
const simulate = require('./pda_sim/simulate.js');
// const cors = require('cors');

let parsed_pda = null;

const app = express();

app.use(express.json()); //add piece of middleware
// and use in request processing pipeline

//looks for index.html file in public folder
app.use(express.static('public'));

//query string parameters, /1?sortBy-name
app.get('/api/courses/:id/', (req, res) => {
    // res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // 404, object not found
        res.status(404).send("course w/ given id not found");
    res.send(course);
});

app.post('/api/pda', (req, res) => {
    // console.log(req.body);
    parsed_pda = parseToPDA(req.body);
    // console.log(parsed_pda)
    res.send(parsed_pda);
});

app.post('/api/simulate', (req, res) => {
    // console.log(req.body);
    let sim_results = []; //booleans
    for (let s of req.body) {
        let result = simulate(s, 0, parsed_pda, 0, []);
        console.log(s);
        sim_results.push(result);
    }
    res.send(sim_results);
});

app.post('/api/courses', (req, res) => {
    // will not reset course object later, so const
    const course = {
        id: courses.length + 1,
        name: req.body.name //need to parse json objects
    };
    courses.push(course);
    res.send(course); //send back course, user needs to know id
});

//change port for production env, hosting env dynamically
//assigns port number

//PORT, process is a global object
//set value: export POR
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}...`)
})

/*
create, read, update data (CRUD)
get, post (create), put (update), delete

RESTFUL CONVENTION:
(http method)
GET /api/customers
GET /api/customers/1
PUT /api/customers/1
DELETE /api/customers/1
POST /api/customers
*/

//install globally, npm i -g nodemon


//Node Package Manager (NPM)
//Async JavaScript
//CRUD operations
//Data Validation
//Authentication and Authorization
//Handling/logging Errors
//Unit and Integration testing
//Test-driven development
//Deployment