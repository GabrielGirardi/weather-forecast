$(document).ready(function() {
  const apiKey = 'c0694e269150453d93928541a7fbaf03';
  let cityname = localStorage.getItem('cidade');
  let loader = $('.loading');

  $('.location').on('click', function() {
    $('.search-city').addClass('active');

    const handleSearch = function() {
      const cityName = $('.search-bar').val();
      if (cityName) {
        localStorage.setItem('cidade', cityName);
        location.reload();
      }
    };

    $('.search-bar').change(handleSearch);

    $('.search-bar').keypress(function(event) {
      if (event.keyCode === 13) { 
        handleSearch();
      }
    });

    $('.close').on('click', function(){
      $('.search-city').removeClass('active');
    });
  });

  function getUserLocation(){
    if (navigator.geolocation) {
      loader.addClass('active');
      $('.error').hide();
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${apiKey}`)
      .then(response => response.json())
      .then(content => {
        let catchLocation = content.name;
        
        if (navigator.geolocation && cityname === null) {
            console.log(catchLocation);
            cityname = localStorage.setItem('cidade', catchLocation);
            location.reload();
        }
      });
    } 
  }

  getUserLocation();

  $(document).ready(
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityname},BR&appid=${apiKey}`)
    .then(response => response.json())
    .then(location => { 
    console.log('asdasd')
    if (!location[0] || location[0].lat === undefined || location[0].lon === undefined) {
      let cityname = localStorage.getItem('backup');  

      localStorage.setItem('cidade', cityname);
      $('.error').addClass('active');
      $('.error .close').on('click', function(){
        window.location.reload();
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
      $('.weather-image').attr('src', weatherConditions[cityTempDesc]);

      localStorage.setItem('backup', cityname);
      loader.removeClass('active');
    });
  })
  );
});