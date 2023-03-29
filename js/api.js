$(document).ready(function(){
   const location = 'https://api.openweathermap.org/geo/1.0/reverse?lat=-27.21&lon=-49.64&appid=c0694e269150453d93928541a7fbaf03';
   const apiKey = 'c0694e269150453d93928541a7fbaf03';

   const city = $('.city');
   const country = $('.country');
   const temp = $('.temp');
   const desc = $('.description');
   let iconWeather = $('.icon-weather');
   let wallpaper = $('body');

   // const url = 'api.openweathermap.org/data/2.5/forecast/daily?lat=-27.2145&lon=-49.6435&cnt=10&appid=c0694e269150453d93928541a7fbaf03';




   fetch(`${location}`)
     .then(response => response.json())
     .then(data => {
       const lat = data[0].lat;
       const lon = data[0].lon;
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=${apiKey}`;

       fetch(`${url}`)
         .then(response => response.json())
         .then(content => {
         // console.log(content);

           const cityName = content.name;
           const cityCountry = content.sys.country;
           let cityTemp = content.main.temp;
           let cityTempDesc = content.weather[0].description;
           let icon = content.weather[0].icon;
           let formatedTemp = Math.round(cityTemp);

           $(city).html(cityName);
           $(country).html(cityCountry);
           $(temp).html(`${formatedTemp}°C`);
           $(desc).html(cityTempDesc);
           $(iconWeather).attr('src', `http://openweathermap.org/img/w/${icon}.png`);

            const weatherConditions = {
                'nublado': './assets/image/cloudy.gif',
                'nuvens dispersas': './assets/image/cloudy.gif',
                'algumas nuvens': './assets/image/cloudy.gif',
                'chuva': './assets/image/rain.gif',
                'chuva leve': './assets/image/rain.gif',
                'céu limpo': './assets/image/sun.gif',
                'tempestade': './assets/image/thunder.gif'
              };
              
              $(wallpaper).css('background-image', `url(${weatherConditions[cityTempDesc]})`);
      
         });
     });

     let endereco = "Av. Paulista, 1000 - Bela Vista, São Paulo - SP";
     let apiURL = "https://maps.googleapis.com/maps/api/geocode/json";
     let apiKey2 = "AIzaSyCv28xzlsM4zEpkBogk4zOnVc0v0uBGQdI"; // Substitua pela sua própria chave de API do Google Maps
     let requestData = { address: endereco, key: apiKey2 };


     $.ajax({
      url: apiURL,
      data: requestData,
      type: "GET",
      dataType: "json",
      success: function(response) {
    
        console.log(response);
      }
    });
 });
