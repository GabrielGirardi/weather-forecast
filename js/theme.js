setTimeout(function(){
const html = document.documentElement
let themeDark = 'dark';

if (localStorage.getItem('classe')) {
 $(html).addClass(themeDark);
 $('.theme .circle-selector').addClass('active');
 $('.theme .circle-selector').find('img').attr('src', './assets/icons/moon.png');
}

$('.theme').click(function(){
   $(this).find('.circle-selector').toggleClass('active');
     html.classList.toggle('dark');

     if($(html).hasClass(themeDark)){
       localStorage.setItem('classe', themeDark);
     } else {
       localStorage.removeItem('classe', themeDark);
     }
   
   if($('.circle-selector').hasClass('active')){
     $(this).find('img').attr('src', './assets/icons/moon.png');     
   } else {
     $(this).find('img').attr('src', './assets/icons/sun.png');     
   }
});
}, 300);
