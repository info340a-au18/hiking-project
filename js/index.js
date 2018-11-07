'use strict';
/*global L*/
/*global noUiSlider*/

let state = {location: {lat:'47.6062095',lng:'-122.3320708'}, options: {location:'', maxDist: 100,maxResults: 100}};

function getCordinates(address){
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyBifT_4HbuyAHS6I01s-4ZRjO_P5F3plGg';
    requestHandler(url,updateCords);
}

function getHikes(){
    let url = 'https://www.hikingproject.com/data/get-trails?lat=' + state.location.lat + '&lon=' + state.location.lng + '&maxDistance=' + state.options.maxDist + '&maxResults='+ state.options.maxResults + '&key=200378416-92e9bd6c5dd48e7dfa8c0a563189c165';
    requestHandler(url,processHikes);
    
}

function getWeather(){

    state.hikes.forEach( function(hike){
        let url = 'https://forecast.weather.gov/MapClick.php?lat=' + hike.latitude + '&lon=' + hike.longitude + '&unit=0&lg=english&FcstType=json';
        requestHandler(url, processWeather, hike.id);
    });
}

function processWeather(data,id){

    var hike = state.hikes.filter( obj => {
        return (obj.id == id);
    })[0];

     hike.weather = data.data;

     //Add weather to hikes
     let card = document.getElementById('' + hike.id);
     let title = document.createElement('h2');
     title.innerText = "Tomorrow's Forecast";
     let forecast = document.createElement('p');
     let image = document.createElement('div');
     image.style.backgroundImage = 'url('+ hike.weather.iconLink[2] + ')';
     image.classList.add('weather');

     //This retreives the forecast for the next day
     forecast.innerHTML = hike.weather.temperature[2] + "&deg; " + hike.weather.weather[2];

    card.append(title);
    card.append(image);
    card.append(forecast);

}

function renderHike(hike){

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
    hikeDistance.innerText = hike.length + ' Miles';
    let hikeElevation = document.createElement('p');
    hikeElevation.innerText = hike.ascent + ' Feet Gain';
    let hikeDesc = document.createElement('p');
    hikeDesc.innerText = hike.summary;

    //Add images
    let hikeImage = document.createElement('div');
        hikeImage.classList.add('hike-photo');

        //Make it work on screen readers
        hikeImage.setAttribute('aria-label',"Photo of " + hike.name);
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
    var marker = L.marker([hike.latitude, hike.longitude]).addTo(state.mapLayer);
    marker.bindPopup("<span class='map-hike-title'>" + hike.name + "</span><br>" + hike.location + '<br> <a href="#'+ hike.id +'">Link</a>' ).openPopup();

}

function processHikes(data){

    state.allHikes = data.trails;

    state.hikes = state.allHikes.slice(0,15);

    renderHikes();
}

function renderHikes(){
    let container;
    let title = document.createElement('h1');
    title.innerText= 'Your Hikes';

    if(document.querySelector('.hike-results') == null){
        container = document.createElement('div');
        container.classList.add('card-container');
        container.classList.add('hike-results');
        container.id = 'hike-results';
        container.append(title);
        document.querySelector('main').append(container);
    }else{
        container = document.querySelector('.hike-results');
        clearChildren('.hike-results');
        container.append(title);
    }
    
    //Clear map

    state.hikes.forEach(function(hike){
        renderHike(hike);
    });

    getWeather();

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateCords(data){


    try{
        let location = data.results[0].geometry.location;
        state.location = location;

        getHikes();
    }catch(err){
          console.log(err);
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
        console.log(err);
    });

}

function updateMaxDistance(){
    document.getElementById('max-distance-value').innerText = document.getElementById('max-distance').value;
}

function pickSort(event){
    let element = document.getElementById(event.target.id);

    let others = document.querySelectorAll('.hike-filters ul li');

    //Set button to selected
    others.forEach( (item) =>{
        item.classList.remove('hike-filters-selected');
    })
    element.classList.add('hike-filters-selected');

    //Update state about which way to sort
    state.options.sort = event.target.id;

}

function submitOptions(){


    let inputLoc = document.getElementById('city-input').value;
    let inputDist = document.getElementById('max-distance').value.toString();

    //If there is a new search, get new hikes
    if(inputLoc != state.options.location || inputDist != state.options.maxDist ){
        state.options.location = inputLoc;
        state.options.maxDist = inputDist;
        getCordinates(state.options.location);
    }

    document.getElementById('hikemap').style.display = 'block';
    document.querySelector('.hike-filters').style.display='block';
    if(window.innerWidth >= 800){
        document.getElementById('hikemap').style.height = document.querySelector('.hike-filters').clientHeight + 'px';
    }else{
        document.getElementById('hikemap').style.height = '400px';
    }

    makeMap();

}

function submitPrefs(){
    let allHikes = state.allHikes;

    allHikes = allHikes.filter(distanceFilter);
    allHikes = allHikes.filter(elevationFilter);

    if(state.options.sort === 'sort-rating'){
        allHikes = allHikes.sort( (hike1,hike2) => {
            return hike2.stars - hike1.stars;
        });
    }else if(state.options.sort === 'sort-votes'){
        allHikes = allHikes.sort( (hike1,hike2) => {
            return hike2.starVotes - hike1.starVotes;
        });
    }else if(state.options.sort === 'sort-long'){
        allHikes = allHikes.sort( (hike1,hike2) => {
            return hike2.length - hike1.length
        });
    }

    state.hikes = allHikes.slice(0,15);
    state.mapLayer.clearLayers();
    renderHikes();
    

}

function clearChildren(query){
    let parent = document.querySelector(query);

    if(parent != null){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }
}


function makeSliders(){
    let distanceSlider = document.querySelector('#distance-slider');
    let elevationSlider = document.querySelector('#elevation-slider');



    noUiSlider.create(distanceSlider, {
        start: [0, 30],
        connect: true,
        range: {
            'min': 0,
            'max': 30
        }
    });

    distanceSlider.noUiSlider.on('update',function(){
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

    elevationSlider.noUiSlider.on('update',function(){
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
    return (hike.ascent <= state.options.hikeElvMax & hike.ascent >= state.options.hikeElvMin);
}

function initializePage(){
    document.getElementById('max-distance').addEventListener('input',updateMaxDistance);
    document.querySelector('#submit-container').addEventListener('click',submitOptions);
    document.getElementById('sort-rating').addEventListener('click', (event)=> pickSort(event));
    document.getElementById('sort-votes').addEventListener('click',(event)=> pickSort(event));
    document.getElementById('sort-long').addEventListener('click',(event)=> pickSort(event));

    window.addEventListener('resize',() => {
        if(window.innerWidth >= 800){
            document.getElementById('hikemap').style.height = document.querySelector('.hike-filters').clientHeight + 'px';
        }else{
            document.getElementById('hikemap').style.height = '400px';
        }
    });

    //Filter Options
    document.querySelector('#submit-pref').addEventListener('click',submitPrefs);

    updateMaxDistance();
    makeSliders();
}

//Mapping things
function makeMap(){


    if(state.map == undefined){
    var mymap = L.map('hikemap').setView([state.location.lat, state.location.lng], 9);
    
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoia2pnb29kd2lucyIsImEiOiJjam8zNnF4YmUwdTA3M3BybGtocWkzejY4In0.9eALJdo0A_rMgg2cgZWHlQ'
    }).addTo(mymap);


    state.map = mymap;
    state.mapLayer = L.layerGroup();
    state.mapLayer.addTo(state.map);
    }else{
        state.mapLayer.clearLayers()
        state.mapLayer = L.layerGroup();
        state.mapLayer.addTo(state.map);
        state.map.panTo(new L.LatLng(state.hikes[0].latitude, state.hikes[0].longitude))
    }


}

initializePage();
