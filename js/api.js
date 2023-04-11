$(document).ready(function() {

 // Validação do nome da cidade se é existente e não é nulo

 if(localStorage.getItem('cidade') == '') {
  localStorage.setItem('cidade', 'Rio do Sul');
}

  // Seletor de cidade a partir do nome

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

    // Fechar componente
    $('.close').on('click', function(){
      $('.search-city').removeClass('active');
    });
  });
  
const apiKey = 'c0694e269150453d93928541a7fbaf03';
let cityname = localStorage.getItem('cidade');
let statecode = 'SC';
let countrycode = 'BR';
let getLocation = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&appid=${apiKey}`;
let city = $('.city');
let temp = $('.temperature');
let conditions = $('.weather-conditions');
let wallpaper = $('.weather-image');
let windSpeed = $('.wind-speed .measure');
let humidity = $('.humidity .measure');
let clouds = $('.clouds .measure');
let loader = $('.loading');

fetch(`${getLocation}`)
  .then(response => response.json())
  .then(location => { 
    if (!location[0] || location[0].lat === undefined || location[0].lon === undefined) {
      let cityname = localStorage.setItem('cidade', 'rio do sul');  
      $('.error').addClass('active');
      $('.error .close').on('click', function(){
        window.location.reload();
      });
      return;
    }

    let lat = location[0].lat;
    let lon = location[0].lon;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${apiKey}`;
    loader.addClass('active');

    fetch(`${url}`)
    .then(response => response.json())
    .then(content => {
      
      fetch(`${url}`)
      .then(response => response.json())
      .then(content => {

          let cityName = content.name;
          let cityCountry = content.sys.country;
          let formatedTemp = Math.round(content.main.temp);
          let cityTempDesc = content.weather[0].description;
          let cityHumidity = content.main.humidity;
          let cityWindSpeed = Math.round(content.wind.speed);
          let cityClouds = content.clouds.all;

          $(city).html(cityName + ', ' + cityCountry);
          $(temp).html(`${formatedTemp}°C`);
          $(conditions).html(cityTempDesc);
          $(windSpeed).html(cityWindSpeed + ' km/h');
          $(humidity).html(cityHumidity + '%');
          $(clouds).html(cityClouds + '%');

          const weatherConditions = {
              'nublado': './assets/image/conditions/clouds.png',
              'nuvens dispersas': './assets/image/conditions/sun-clouds.png',
              'algumas nuvens': './assets/image/conditions/sun-clouds.png',
              'chuva': './assets/image/conditions/sun-clouds-rain.png',
              'chuva leve': './assets/image/conditions/sun-clouds-rain.png',
              'chuva moderada': './assets/image/conditions/sun-clouds-rain.png',
              'céu limpo': './assets/image/conditions/sun.png',
              'tempestade': './assets/image/conditions/storm.png'
          };

          $(wallpaper).attr('src', weatherConditions[cityTempDesc]);

          loader.removeClass('active');
      });
    });
  })
  .catch(error => {
    console.error('Erro na busca da localização', error);
  });

});