'use strict';

let state = {location: {lat:'47.6062095',lng:'-122.3320708',maxDist: 100}, options: {location:'', maxDist: 10,maxResults: 100}};

function getWeather(lat,long){
    let promise = fetch('https://forecast.weather.gov/MapClick.php?lat='+ lat + '&lon=' + lon + '&unit=0&lg=english&FcstType=json');
};

function getCordinates(address){
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBifT_4HbuyAHS6I01s-4ZRjO_P5F3plGg';
    requestHandler(url,updateCords);
}

function getHikes(){

    let url = 'https://www.hikingproject.com/data/get-trails?lat=' + state.location.lat + '&lon=' + state.location.lng + '&maxDistance=' + state.location.maxDist + '&maxResults='+ state.options.maxResults + '&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165';
    console.log('getHikes URL: '+url)
    requestHandler(url,processHikes);
    
}

function getWeather(){

    state.hikes.forEach( function(hike){
        let url = 'https://forecast.weather.gov/MapClick.php?lat=' + hike.latitude + '&lon=' + hike.longitude + '&unit=0&lg=english&FcstType=json';
        console.log('url ' +url);
        requestHandler(url, processWeather, hike.id);
    });
}

function processWeather(data,id){
    console.log(data);

    var hike = state.hikes.filter( obj => {
        return (obj.id == id);
    })[0];

     hike.weather = data.data;

     //Add weather to hikes
     let card = document.getElementById('' + hike.id);
     let forecast = document.createElement('p');
     let image = document.createElement('div');
     image.style.backgroundImage = 'url('+ hike.weather.iconLink[2] + ')';
     image.classList.add('weather');

     //This retreives the forecast for the next day
     forecast.innerHTML = hike.weather.temperature[2] + " " + hike.weather.weather[2];

     card.append(image);
     card.append(forecast);

}

function processHikes(data){

    let container;

    if(document.querySelector('.hike-results') == null){
        container = document.createElement('div');
        container.classList.add('card-container');
        container.classList.add('hike-results');
        document.querySelector('main').append(container);
    }else{
        container = document.querySelector('.hike-results');
    }


    state.allHikes = data.trails;

    state.hikes = state.allHikes.slice(0,10);

    state.hikes.forEach(function(hike){
        renderHike(hike);
    });

    state.displayHikes

    getWeather();
}

function updateCords(data){


    try{
        let location = data.results[0].geometry.location;
        state.location = location;
        console.log(state.location);
        getHikes();
       // getWeather(state.location); 
    }catch{
        alert('Location not found. Please Enter a City, Address, or Zip Code');
    }
    
}

function requestHandler(url,handlerFunction,id){

    let promise = fetch(url);

    promise.then(function(response){
        return response.json();
    })
    .then(function (data){
        handlerFunction(data,id);
    })
    .catch(function (err){
        alert(err);
    });

}

function updateMaxDistance(){
    state.options.maxDist = document.getElementById('max-distance').value;
    document.getElementById('max-distance-value').innerText = state.options.maxDist;
}

function submitOptions(){


    let input = document.getElementById('city-input').value;

    //If there is a new search, get new hikes
    if(input != state.options.location){
        clearChildren('.hike-results');
        state.options.location = input;
        getCordinates(state.options.location);
    }
    else{
        //If the location is not updated, use the filters
    }
    

    
    document.getElementById('hikemap').style.display = 'block';
    makeMap();
    document.querySelector('.hike-filters').style.display='block';
}

function clearChildren(query){
    let parent = document.querySelector(query);

    if(parent != null){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
}

function renderHike(hike){

    let options = document.querySelector('.options');
    
    //options.style.display = 'none';

    let container = document.querySelector('.hike-results');

    document.querySelector('main').append()
    let card = document.createElement('div');
    card.classList.add('card');
    card.id = hike.id;

    //Add title
    let hikeTitle = document.createElement('h2');
    hikeTitle.textContent = hike.name;

    let hikeLocation = document.createElement('p');
    hikeLocation.textContent = hike.location;

    //Add stats
    let hikeDistance = document.createElement('p');
    hikeDistance.innerText = hike.length;
    let hikeElevation = document.createElement('p');
    hikeElevation.innerText = hike.ascent + ' Feet Gain';
    let hikeDesc = document.createElement('p');
    hikeDesc.innerText = hike.summary;

    //Add images
    let hikeImage = document.createElement('div');
        hikeImage.classList.add('hike-photo');
    if( hike.imgMedium != ""){
        hikeImage.style.backgroundImage = 'url('+hike.imgMedium + ')';
    }else{
        hikeImage.style.display = 'none';
    }

    //Add it to the dom
    card.append(hikeTitle);
    card.append(hikeImage);
    card.append(hikeLocation);
    card.append(hikeDistance);
    card.append(hikeElevation);
    card.append(hikeDesc);

    container.append(card);

    //Also Add it to a map
    var marker = L.marker([hike.latitude, hike.longitude]).addTo(state.map);
    marker.bindPopup("<span class='map-hike-title'>" + hike.name + "</span><br>" + hike.location + '<br> <a href="#'+ hike.id +'">Link</a>' ).openPopup();

}

function makeSliders(){
    let distanceSlider = document.querySelector('#distance-slider');
    let elevationSlider = document.querySelector('#elevation-slider');



    noUiSlider.create(distanceSlider, {
        start: [0, 50],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    });

    distanceSlider.noUiSlider.on('update',function(event){
        let min = parseInt(distanceSlider.noUiSlider.get()[0]);
        let max = parseInt(distanceSlider.noUiSlider.get()[1]);

        state.options.hikeDistMin = min;
        state.options.hikeDistMax = max;

        document.getElementById('hike-distance').innerText = state.options.hikeDistMin + " to " + state.options.hikeDistMax;


    });

    noUiSlider.create(elevationSlider, {
        start: [0, 50],
        connect: true,
        range: {
            'min': 0,
            'max': 10000
        }
    });

    elevationSlider.noUiSlider.on('update',function(event){
        let min = parseInt(elevationSlider.noUiSlider.get()[0]);
        let max = parseInt(elevationSlider.noUiSlider.get()[1]);

        state.options.hikeElvMin = min;
        state.options.hikeElvMax = max;

        document.getElementById('hike-elevation').innerText = state.options.hikeElvMin + " to " + state.options.hikeElvMax;
    });
}

function distanceFilter(hike){
    return (hike.length <= state.options.hikeDistMax & hike.length >= state.options.hikeDistMin);
}

function elevationFilter(hike){

}

function initializePage(){
    document.getElementById('max-distance').addEventListener('input',updateMaxDistance);
    //document.getElementById('city-input').addEventListener('input',updateLocation);
    document.querySelector('.submit-container').addEventListener('click',submitOptions);
    updateMaxDistance();
    makeSliders();

    
}

//Mapping things
function makeMap(){

    var mymap = L.map('hikemap').setView([state.location.lat, state.location.lng], 9);
    
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoia2pnb29kd2lucyIsImEiOiJjam8zNnF4YmUwdTA3M3BybGtocWkzejY4In0.9eALJdo0A_rMgg2cgZWHlQ'
    }).addTo(mymap);

    state.map = mymap;

}




//getCordinates('Seattle,WA');
initializePage();
