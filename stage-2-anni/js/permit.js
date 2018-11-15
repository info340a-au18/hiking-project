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