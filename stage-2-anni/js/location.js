'use strict';

//open menu 
$('#hamburger-menu').click(openNav);

//close menu
$('.closebtn').click(closeNav);

/* Set the width of the side navigation to 250px */
function openNav() {
    $('#menu').css('width', '300px');
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    console.log('hi');
    $('#menu').css('width', '0');
}

//api keys and base urls
var keyHiking = '200378064-b43312f21f05d6c61351cfd439449ead';
var keyGeo = 'AIzaSyAcSwooocIeTLXKfYrEhKzfkxisazfPVtA';
const baseGeo = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
var baseHiking = 'https://www.hikingproject.com/data/get-trails?';

//parameter from another window if it's opened by anotehr window
function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function getUrlParam(parameter, defaultvalue) {
    var urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}
var address = getUrlParam('address', 'Empty');

//checking whether the window opened by the search bar in home window
if (address != 'Empty') {
    $('input').val(address);
    getGeo(address);
}

//function get latitudes and longitudes from the address
function getGeo(address) {
    let url = baseGeo + address + '&key=' + keyGeo;
    var hiking = fetch(url)  //start the download
        .then(function (response) {  //when done downloading
            let dataPromise = response.json();  //start encoding into an object
            return dataPromise;  //hand this Promise up
        })
        .then(getTrail)
        .catch(renderError);
    return hiking;
}

//function to get trail info from the latitudes and longitudes
function getTrail(data) {
    togglerSpinner(false);
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    let value = baseHiking + 'lat=' + lat + '&lon=' + lng + '&key=' + keyHiking;
    let trail = fetch(value)
        .then(function (response) {  //when done downloading
            let dataPromise = response.json();  //start encoding into an object
            return dataPromise;  //hand this Promise up
        })
        .then(renderSearchResults)
        .catch(renderError);
    togglerSpinner(true);
    return trail;
}

//button listen to events and return output
$('input').keypress(function (e) {
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        if ($('input').val() != undefined & $('input').val() != '') {
            return getGeo($('input').val());
        } else {
            $('#trailList').remove();
            let row = $("<div class = 'row' id = 'trailList'>")
            $('#containCards').append(row);
            $('#empty').css('height', '500px');
            renderError(new Error("Please enter a search keyword"));
        }
    }
});

//when search button is clicked, triggers the search
$('#search').click(function (event) {
    event.preventDefault();
    if ($('input').val() != undefined & $('input').val() != '') {
        return getGeo($('input').val());
    } else {
        $('#trailList').remove();
        let row = $("<div class = 'row' id = 'trailList'>")
        $('#containCards').append(row);
        $('#empty').css('height', '500px');
        renderError(new Error("Please enter a search keyword"));
    }
});

//when slider is clicked, show slider value
$('.slider').click(function (){
    $('p').text("Max Value: " + document.getElementById("myRange").value + " miles");
    if ($('input').val() != undefined & $('input').val() != '') {
        return getGeo($('input').val());
    }
})

//automatic change search results based on checkbox
document.getElementById('check1').addEventListener('change', function(){
    return getGeo($('input').val());
});
document.getElementById('check2').addEventListener('change', function(){
    return getGeo($('input').val());
});
document.getElementById('check3').addEventListener('change', function(){
    return getGeo($('input').val());
});

//hide or show filter
$('#advance').click(function(){
    $("#filter").toggle();
})

// spinner for loading data
function togglerSpinner(condition) {
    $('i.fa-spinner').toggleClass('d-none', condition);
}

//turn each trail into a list
function renderTrail(trail) {
    let set = $('#trailList');
    let trails = $('<div>');
    trails.addClass('cardSet col-lg-6 col-xl-4');
    trails.css('display', 'flex');
    set.append(trails);
    let card = $('<div>');
    card.addClass('card');
    trails.append(card);
    let cardBody = $('<div>');
    cardBody.addClass('card-body');
    card.append(cardBody);
    let row2 = $('<div>');
    row2.addClass('row');
    cardBody.append(row2);
    let cardColImg = $('<div>');
    cardColImg.addClass('col-sm-6 col-lg-12');
    row2.append(cardColImg);
    let img = getImg(trail);
    cardColImg.append(img);
    let cardCol = $('<div>');
    cardCol.addClass('col-sm-6 col-lg-12');
    row2.append(cardCol);
    let name = $('<h4>' + trail.name + '</h4>');
    cardCol.append(name);
    let info = $('<div>');
    info.addClass('info');
    cardCol.append(info);
    let ul = $('<ul>');
    ul.addClass('card-text');
    info.append(ul);
    let loca = $('<li>Location: ' + trail.location + '</li>');
    ul.append(loca);
    let leng = $('<li>Length: ' + trail.length + ' miles' + '</li>');
    //if the length is longer than the filter value, remove this card
    if (trail.length > (document.getElementById("myRange").value)){
        trails.remove();
        return;
    }
    ul.append(leng);
    let summary = $('<li>Summary: ' + trail.summary + '</li>');
    ul.append(summary);
    let difficulty = $('<li>Difficulty:</li>');
    ul.append(difficulty);
    let diffColor = getDifficulty(trail.difficulty);
    //if the length is not in the selected difficulty level, remove this card
    if (diffColor != undefined){
        diffColor.css({ height: '12px', width: '12px', margin: '10px' });
        difficulty.append(diffColor);
    } else {
        trails.remove();
        return;
    }
    let star = getStars(trail.stars);
    ul.append(star);
    let link = $('<a>');
    link.attr('href', trail.url);
    link.text('Go');
    link.addClass('btn btn-dark');
    info.append(link);
}

//checks if the img link is empty
//if it is, set it to default img
function getImg(object) {
    let img = $('<img>');
    img.addClass('pb-3');
    if (object.imgSmallMed == "") {
        img.attr({ src: 'img/hiker-small.jpg' });
    } else {
        img.attr({ src: object.imgSmallMed });
    }
    return img;
}

//turns the stars rating to pictures of star
function getStars(double) {
    let stars = $('<li>Rating: </li>');
    let num = double;
    while (num > 1) {
        let star = $('<img>');
        star.attr('src', 'img/star.png');
        star.css({ height: '15px', width: '15px', margin: '5px' });
        stars.append(star);
        num--;
    }
    if (num > 0) {
        let star = $('<img>');
        star.attr('src', 'img/half.png');
        star.css({ height: '15px', width: '15px', margin: '5px' });
        stars.append(star);
        num--;
    }
    return stars;
}

//color coding the difficulty level
function getDifficulty(string) {
    if ($('#check1').is(":checked") & ((string == 'green') || (string =='greenBlue'))) {
        let diff = $('<img>');
        diff.attr('src', 'img/green.png');
        return diff;
    } else if ($('#check2').is(":checked") & ((string == 'blue') || (string == 'blueBlack'))) {
        let diff = $('<img>');
        diff.attr('src', 'img/blue.png');
        return diff;
    } else if ($('#check3').is(":checked") & ((string == 'black') || (string == 'blackBlack'))){
        let diff = $('<img>');
        diff.attr('src', 'img/black.png');
        return diff;
    } else {
        return;
    }
}

//get the array of information and organize it
function renderSearchResults(object) {
    $('#trailList').remove();
    let row = $("<div class = 'row' id = 'trailList'>")
    $('#containCards').append(row);
    let trails = object.trails;
    console.log(trails);
    trails.forEach(renderTrail);
    if (($("#trailList div").length == 0) || trails.length == 0) {
        $('#empty').css('height', '500px');
        renderError(new Error("No results found"));
    } else {
        $('#empty').css('height', '100px');
    }
}

//shows an alert when the location is empty
function renderError(error) {
    let alert = $('<p class="alert alert-danger"></p>');
    alert.text(error.message);
    $('#trailList').append(alert);
}