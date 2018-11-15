'use strict';

//button listen to events and return output
$('input').keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        window.location.replace('location.html?address=' + $('input').val());
    }
});

//button listen to events and return output
$('#search').click(function () {
    window.location.replace('location.html?address=' + $('input').val());
});

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

