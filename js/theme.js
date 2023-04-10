setTimeout(function(){
const html = document.documentElement
let themeLight = 'light';

if (localStorage.getItem('classe')) {
 $(html).addClass(themeLight);
 $('.theme .circle-selector').addClass('active');
 $('.theme .circle-selector').find('img').attr('src', './assets/icons/sun.png');
}

$('.theme').click(function(){
   $(this).find('.circle-selector').toggleClass('active');
     html.classList.toggle('light');

     if($(html).hasClass(themeLight)){
       localStorage.setItem('classe', themeLight);
     } else {
       localStorage.removeItem('classe', themeLight);
     }
   
   if($('.circle-selector').hasClass('active')){
     $(this).find('img').attr('src', './assets/icons/sun.png');     
   } else {
     $(this).find('img').attr('src', './assets/icons/moon.png');     
   }
});
}, 300);
