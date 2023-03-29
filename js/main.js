$(document).ready(function(){
    $('.button-more').click(function(){
      $('.extra-content').animate({
        height: 'toggle'
      });

      $(this).html($(this).html() == '-' ? '+' : '-');
    });
  });