'use strict'


$('.show-menu').click(function(){
    $('.navbar').removeClass('navbarHidden');
    $('.navbar').addClass('navbarShown');
});
$('.hide-menu').click(function(){
    $('.navbar').removeClass('navbarShown');
    $('.navbar').addClass('navbarHidden');
});
