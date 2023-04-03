$(document).ready(function(){
   const location = 'https://api.openweathermap.org/geo/1.0/reverse?lat=-27.21&lon=-49.64&appid=c0694e269150453d93928541a7fbaf03';
   const apiKey = 'c0694e269150453d93928541a7fbaf03';

   let city = $('.city');
   let temp = $('.temperature');
   let conditions = $('.weather-conditions');
   let wallpaper = $('.weather-image');
   let windSpeed = $('.wind-speed .measure');
   let humidity = $('.humidity .measure');
   let clouds = $('.clouds .measure');

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
         console.log(content);

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
      
         });

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
     });

    //  let endereco = "Av. Paulista, 1000 - Bela Vista, São Paulo - SP";
    //  let apiURL = "https://maps.googleapis.com/maps/api/geocode/json";
    //  let apiKey2 = "AIzaSyCv28xzlsM4zEpkBogk4zOnVc0v0uBGQdI"; // Substitua pela sua própria chave de API do Google Maps
    //  let requestData = { address: endereco, key: apiKey2 };


    //  $.ajax({
    //   url: apiURL,
    //   data: requestData,
    //   type: "GET",
    //   dataType: "json",
    //   success: function(response) {
    
    //     console.log(response);
    //   }
    // });
 });
