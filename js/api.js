$(document).ready(function() {
  const apiKey = 'c0694e269150453d93928541a7fbaf03';
  let cityname = localStorage.getItem('cidade');
  let loader = $('.loading');

  if(localStorage.getItem('validation')) {
    $('.welcome').removeClass('active');
    fetchLocation()
  };

  if(localStorage.getItem('backup')) {
    $('.last-search').addClass('active');

    $('.last-search').on('click', function() {
      localStorage.setItem('cidade', localStorage.getItem('backup'));
      window.location.reload();
    });
  } else {
    $('.last-search').hide();
  }

  if ($('.welcome').hasClass('active')){
    const firstSearch = function() {
      const cityName = $('.search-bar.welcome-bar').val();
      if (cityName) {
        localStorage.setItem('cidade', cityName);
        location.reload();
        localStorage.setItem('validation', true);
      };
    };

    $('.search-bar').change(firstSearch);

    $('.search-bar').keypress(function(event) {
      if (event.keyCode === 13) { 
        firstSearch();
      };
    });
  };

  $('.location').on('click', function() {
    $('.search-city').addClass('active');

    const handleSearch = function() {
      const cityName = $('.search-bar').val();
      if (cityName) {
        localStorage.setItem('cidade', cityName);
        location.reload();
      };
    };

    $('.search-bar').change(handleSearch);

    $('.search-bar').keypress(function(event) {
      if (event.keyCode === 13) { 
        handleSearch();
      };
    });

    $('.close').on('click', function(){
      $('.search-city').removeClass('active');
    });
  });

  function fetchLocation(){
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname},BR&appid=${apiKey}`)
    .then(response => response.json())
    .then(location => { 
    if (!location[0] || location[0].lat === undefined || location[0].lon === undefined) {
      localStorage.setItem('cidade', cityname);
      $('.error').addClass('active');

      const errorSearch = function() {
        const cityName = $('.search-bar.error-bar').val();

        if (cityName) {
          localStorage.setItem('cidade', cityName);
          window.location.reload();
        }
      };
  
      $('.search-bar').change(errorSearch);
  
      $('.search-bar').keypress(function(event) {
        if (event.keyCode === 13) { 
          errorSearch();
        }
      });
      return;
    }

    let lat = location[0].lat;
    let lon = location[0].lon;
    loader.addClass('active');

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(content => {

      let cityName = content.name;
      let cityCountry = content.sys.country;
      let formatedTemp = Math.round(content.main.temp);
      let cityTempDesc = content.weather[0].description;
      let cityHumidity = content.main.humidity;
      let cityWindSpeed = Math.round(content.wind.speed);
      let cityClouds = content.clouds.all;   
      let feelLike = Math.round(content.main.feels_like);    
      let weatherConditions = {
          'nublado': './assets/image/conditions/clouds.png',
          'nuvens dispersas': './assets/image/conditions/sun-clouds.png',
          'nuvens quebradas': './assets/image/conditions/sun-clouds.png',
          'algumas nuvens': './assets/image/conditions/sun-clouds.png',
          'chuva': './assets/image/conditions/sun-clouds-rain.png',
          'chuva leve': './assets/image/conditions/sun-clouds-rain.png',
          'chuva moderada': './assets/image/conditions/sun-clouds-rain.png',
          'céu limpo': './assets/image/conditions/sun.png',
          'tempestade': './assets/image/conditions/storm.png'
      };

      $('.city').html(cityName + ', ' + cityCountry);
      $('.temperature').html(`${formatedTemp}°C`);
      $('.weather-conditions').html(cityTempDesc);
      $('.wind-speed .measure').html(cityWindSpeed + ' km/h');
      $('.humidity .measure').html(cityHumidity + '%');
      $('.clouds .measure').html(cityClouds + '%');
      $('.rain .measure').html(feelLike + ' °C');
      $('.weather-image').attr('src', weatherConditions[cityTempDesc]);

      localStorage.setItem('backup', cityname);
      loader.removeClass('active');
    });
  });
  };
});
