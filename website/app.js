/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=bae819c03bbc00f53d22bdd541fffade';
const unit= '&units=metric';

async function getWeather(baseUrl,zip,unit,apiKey){
    const response=await fetch(baseURL+zip+unit+apiKey);
    try{
        const data=await response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log('error',error);
    }
};

let generate=document.getElementById('generate');

generate.addEventListener('click',()=>{
    let zip=document.getElementById('zip');
    let feelings=document.getElementById('feelings');

    console.log(zip.value+' \t'+feelings.value);
    getWeather(baseURL,zip.value,unit,apiKey)
    .then((data)=>{
      console.log(d.toString());
      postData('/add',{temperature:data.main.temp , date:d.toString() , "user response":`zip:${zip.value} \n ${feelings.value}`});
    })
    .then( ()=>{
      updateUI() } );
});



const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      return newData
    }
    catch(error) {
      console.log("error", error);
    }
}

const updateUI = async () => {
    const request = await fetch('/getWeather');
    try{
      const allData = await request.json();
      document.getElementById('temp').innerHTML = allData['temperature'];
      document.getElementById('date').innerHTML = allData['date'];
      document.getElementById('content').innerHTML = allData["user response"];
  
    }catch(error){
      console.log("error", error);
    }
  }