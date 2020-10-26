/* Global Variables */
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API

const apiKey = 'b9d5af8562ce85c2858c394512b50743',
    apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?'

// Event listener to add function to existing HTML DOM element

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generate').addEventListener('click', preformAction);
})

/* Function called by event listener */

const preformAction = function (e) {
    const zip = document.getElementById('zip').value
    const country = document.getElementById('country').value
    const feelings = document.getElementById('feelings').value

    if (zip.length !== 0 && country.length !== 0) {
        getWeatherAPI(zip, country, feelings)
    } else {
        alert('Please enter right values')
    }
}

/* Function to GET Web API Data*/

const getWeatherAPI = async function (zip, country, feelings) {
    const apiUrl = `${apiBaseUrl}APPID=${apiKey}&zip=${zip},${country}`
    const response =
        await fetch(apiUrl)

    try {
        data = await response.json()
        console.log(data)
        const { temp, humidity } = data.main
        const { speed } = data.wind

        postData("http://localhost:3000/projectData", {
            temp: temp,
            date: newDate,
            humidity: humidity,
            speed: speed,
            content: feelings
        })

        getData().then((data) => {
            updateUIValues(data)
        })


    } catch (error) {
        console.log('error:', error)
    }
}

/* Function to POST data */

const postData = async function (url = '', data = {}) {

    return await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

/* Function to GET Project Data */
const getData = async function () {
    let response = await fetch('http://localhost:3000/ProjectData')
    try {
        let data = await response.json()
        return data
    } catch (error) {
        console.log('error:', error)
    }

}

/* Function Update UI Values */
const updateUIValues = function (data) {

    //convent kelvin to celsius
    let tempData =`${data.temp - 273.15}` 

    //take only up to 5 digits from string
    tempData = tempData.substring(0, 2) 
    
    //Display Most Recent Entry
    let div = document.getElementsByClassName('entry')
    div[0].style.display='block'

    //dynamically set according to data returned
    document.getElementById('date').innerHTML = data.date
    document.getElementById('temp').innerHTML = `${tempData} C`
    document.getElementById('content').innerHTML = data.content
    document.getElementById('wind').innerHTML = `${data.speed} km/h`
    document.getElementById('humidity').innerHTML = `${data.humidity}%`

}