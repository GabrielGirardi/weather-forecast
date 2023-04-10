$(document).ready(function() {

  $('.location').on('click', function(){
    let cityname = prompt('Digite o nome da cidade');
    localStorage.setItem('cidade', cityname);
    location.reload();
  });

  const apiKey = 'c0694e269150453d93928541a7fbaf03';
  let cityname = localStorage.getItem('cidade');
  let statecode = 'SC';
  let countrycode = 'BR';
  let getLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&appid=${apiKey}`;
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
        // console.log(location);
        let lat = location[0].lat;
        let lon = location[0].lon;
        // console.log(lat, lon)

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${apiKey}`;
        loader.addClass('active');

        fetch(`${url}`)
          .then(response => response.json())
          .then(content => {
            // console.log(content);

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
});

