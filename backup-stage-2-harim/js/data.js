'use strict';

let state = {
    numResults:0,
    onPage:5,
    myLat: 0,
    myLon: 0,
    sort: $('input[name=sortBy]:checked').val(),
    sortedData: 0
}

let getData = function(){

    toggleSpinner();

    fetch('https://query.data.world/s/ikqdonu55apxupgqzqqseszqlbilad')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        addDistanceAndSort(data);       
    });
        
}

getData();

function removeNull(data){

    for(let i = 0; i < data.length; i++){
        if(data[i].coordinates.lat === null || data[i].elevation.gain === null || data[i].elevation['Highest Point'] === null ){
            data.splice(i, 1);
            i--;
            state.numResults--;
        }
    }

}


function renderTrailInfo(trail){
    
    state.numResults++;

    let trailListItem = $('<li class="trail">');
    let trailCard = $('<div class="trailCard">');
    trailListItem.append(trailCard);
    $('ul.list').append(trailListItem);

    let trailImg = $('<span class="trail-img">');
    trailCard.append(trailImg);

    let trailInfo = $('<span class="trail-info">');
    trailCard.append(trailInfo);

    if(trail.name.includes('Park')){
        trailImg.append($('<img class="trailIcon" src="img/icon-forrest.png">'));
    }else if(trail.name.includes('Lake')){
        trailImg.append($('<img class="trailIcon" src="img/icon-lake.png">'));
    }else if(trail.name.includes('Peak') || trail.name.includes('Point')){
        trailImg.append($('<img class="trailIcon" src="img/icon-peak.png">'));
    }else if(trail.name.includes('Mount')){
        trailImg.append($('<img class="trailIcon" src="img/icon-mountain.png">'));
    }else if(trail.name.includes('Lookout') || trail.name.includes('View')){
        trailImg.append($('<img class="trailIcon" src="img/icon-lookout.png">'));
    }else if(trail.name.includes('Ledge') || trail.name.includes('Ridge')){
        trailImg.append($('<img class="trailIcon" src="img/icon-ridge.png">'));
    }else if(trail.name.includes('Butte')){
        trailImg.append($('<img class="trailIcon" src="img/icon-butte.png">'));
    }else if(trail.name.includes('Pass')){
        trailImg.append($('<img class="trailIcon" src="img/icon-pass.png">'));
    }else if(trail.name.includes('Basin')){
        trailImg.append($('<img class="trailIcon" src="img/icon-basin.png">'));
    }else if(trail.name.includes('Cave')){
        trailImg.append($('<img class="trailIcon" src="img/icon-cave.png">'));
    }else if(trail.name.includes('River') || trail.name.includes('Creek')){
        trailImg.append($('<img class="trailIcon" src="img/icon-river.png">'));
    }else if(trail.name.includes('Canyon')){
        trailImg.append($('<img class="trailIcon" src="img/icon-canyon.png">'));
    }else if(trail.name.includes('Dome')){
        trailImg.append($('<img class="trailIcon" src="img/icon-dome.png">'));
    }else{
        trailImg.append($('<img class="trailIcon" src="img/icon-else.png">'));
    }
    let name = $('<h2 class="trail-name">');
    name.text(trail.name);
    trailInfo.append(name);
    
    let highElevation = $('<span>');
    highElevation.text('Highest Point: ' + trail.elevation['Highest Point'])
    trailInfo.append(highElevation);


    let gain = $('<span>');
    gain.text('Gain: ' + trail.elevation.Gain);
    trailInfo.append(gain);

    let length = $('<span>');
    length.text('Length: ' + trail.length);
    trailInfo.append(length);

    let mapImg = $('<img class="map-img hide">');
    trailCard.append(mapImg);

    let extraTrailInfo = $('<div class="extra-info hide">')
    

    let trailLat = $('<div class="hide">' + trail.coordinates.lat + '</div>');
    let trailLon = $('<div class="hide">' + trail.coordinates.lon + '</div>');
    extraTrailInfo.append(trailLat);
    extraTrailInfo.append(trailLon);

    let featureHeading = $('<h3>Trail Features!</h3>');
    let trailFeatures = $('<ul>');
    for(let i=0; i<trail.features.length; i++){
        let feature = $('<li>');
        feature.text(trail.features[i]);
        trailFeatures.append(feature);
    }
    extraTrailInfo.append(featureHeading);
    extraTrailInfo.append(trailFeatures);

    trailCard.append(extraTrailInfo);

}

function renderTrailCards(sortedData){

    $('ul').empty();
    state.numResults = 0;


    for(let i=0; i < sortedData.length; i++){
        renderTrailInfo(sortedData[i]);
    }

    toggleSpinner();

    if($('#light-pagination').hasClass('hide')){
        $('#light-pagination').toggleClass('hide');
    }
    //Starts Pagination stuff
    let trailCards = $('li.trail');
    trailCards.slice(state.onPage).hide();
    $('#light-pagination').pagination({
        items: state.numResults,
        itemsOnPage: state.onPage,
        cssStyle: 'light-theme',
        
        onPageClick: function(pageNumber){
            let showFrom = state.onPage * (pageNumber - 1);
            let showTo = showFrom + state.onPage;

            trailCards.hide().slice(showFrom, showTo).show();
        }
    });

}

function toggleSpinner(){
    $('.fa-spinner').toggleClass('hide');
}

function addDistanceAndSort(data) {
    let sortedData = data;
    if(state.sortedData == 0){
        state.sortedData = sortedData;
    }

    if (!navigator.geolocation) {
        $('main').text("Geolocation is not supported by this browser.");
    }

    function success(position){
        let myLat = position.coords.latitude;
        let myLon = position.coords.longitude;
        state.myLat = myLat;
        state.myLon = myLon;

        for(let trail in state.sortedData){
            state.sortedData[trail].distance = Math.round(getDistanceFromLatLonInMi(state.sortedData[trail].coordinates.lat, state.sortedData[trail].coordinates.lon, myLat, myLon) * 100) / 100;
        }
        
        if(state.sort != 'gain' && state.sort != 'highest'){
            state.sortedData.sort((a, b) => parseFloat(a[state.sort]) - parseFloat(b[state.sort]));
        } else if(state.sort == 'gain'){
            state.sortedData.sort((a, b) => parseFloat(a.elevation.Gain) - parseFloat(b.elevation.Gain));
        } else if(state.sort == 'highest'){
            state.sortedData.sort((a, b) => parseFloat(a.elevation['Highest Point']) - parseFloat(b.elevation['Highest Point']));
        }


        removeNull(state.sortedData);
        renderTrailCards(state.sortedData);

    }
    
    function error() {
        for(let trail in data){
            data[trail].distance = 'No location information'
        }

        $('.location').addClass('hide');

        if(state.sort == 'length'){
            state.sortedData.sort((a, b) => parseFloat(a.length) - parseFloat(b.length));
        } else if(state.sort == 'gain'){
            state.sortedData.sort((a, b) => parseFloat(a.elevation.Gain) - parseFloat(b.elevation.Gain));
        }else if(state.sort == 'highest'){
            state.sortedData.sort((a, b) => parseFloat(a.elevation['Highest Point']) - parseFloat(b.elevation['Highest Point']));
        }

        removeNull(state.sortedData);
        renderTrailCards(state.sortedData);
    }

    navigator.geolocation.getCurrentPosition(success, error);
    
}

function sortBy(){
    toggleSpinner();
    toggleSpinner();
    state.sort = $('input[name=sortBy]:checked').val();
    addDistanceAndSort()
    toggleSpinner();
}


//From StackOverflow 
//(https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula)
function getDistanceFromLatLonInMi(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d / 1.609; //in Miles :)
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  
$(function(){
    // Search  is broken rn :(
    // $('.filters .button').click(function(){
    //     filterCards($('#trail-search')[0].value);        
    // });   
    
    $('.dropdown-button').click(function(){
        $('.dropdown-content').toggleClass('dd-hide');
        $('.dropdown-content').toggleClass('dd-show');
    })
    $('.dropdown-content button').click(function(event){
        state.onPage = event.target.textContent;
        getData();
    })
    
    //show more data on card on click
    $('.list').click(function(event){

        let trailCard = $(event.target).closest('div.trailCard');
        if(trailCard.length > 0){
            let mapImg = $(trailCard[0].children[2]);
            let trailLat = $(trailCard[0].children[3].children[0])[0].textContent;
            let trailLon = $(trailCard[0].children[3].children[1])[0].textContent;

            if(state.myLat != 0 && state.myLon != 0){
                mapImg.attr('src', 'https://www.mapquestapi.com/staticmap/v5/map?start=' + state.myLat + ',' + state.myLon +'|flag-start&end=' + trailLat + ',' + trailLon + '|flag-end&size=@2x&key=GGfWYR4qgT2rrVZCbsX8UeXg3xQ8AJQH');
            }else{
                mapImg.attr('src', 'https://www.mapquestapi.com/staticmap/v5/map?locations=' +  trailLat + ',' + trailLon + '&zoom=10&size=@2x&key=GGfWYR4qgT2rrVZCbsX8UeXg3xQ8AJQH');
            }

            $(trailCard[0].children[2]).toggleClass('hide');
            $(trailCard[0].children[3]).toggleClass('hide');           
            $(trailCard[0].children[3]).toggleClass('show');


            trailCard.animate({
            })
        }
    });

    $('.sort').click(function(){
        sortBy();
    });

});


// Search  is broken rn :(
// function filterCards(keyword){
//     let list = $('ul.list')[0].children;

//     keyword = keyword.toUpperCase();      

//     for(let i=0; i < list.length; i++){
        
//         let trail = $($(list[i])[0].children[0]);
//         console.log(trail);
//         let trailName = $(trail[0].children[1].children[0])[0].textContent;
        
//         if(trailName.toUpperCase().indexOf(keyword) > -1){
//             trail.removeClass('hideCard');
//             trail.addClass('showCard');
//         } else{
//             trail.removeClass('showCard');
//             trail.addClass('hideCard');
//         }
//     }
// }
