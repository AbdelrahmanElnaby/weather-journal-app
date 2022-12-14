// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express=require('express');
// Start up an instance of app
const app=express();
/* Middleware*/
const bodyParser=require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port=8000;

app.listen(port,()=> 
    console.log(`server is running on port ${port}`));

app.post('/add',(req,res)=>{
    const data=req.body;
    projectData['temperature']=data['temperature'];
    projectData['date']=data['date'];
    projectData['user response']=data['user response'];
});

app.get('/getWeather',(req,res)=>{
    res.send(projectData);
});
