$(document).ready(function(){
   const location = 'https://api.openweathermap.org/geo/1.0/reverse?lat=-27.21&lon=-49.64&appid=c0694e269150453d93928541a7fbaf03';
   const apiKey = 'c0694e269150453d93928541a7fbaf03';

   const city = $('.city');
   const country = $('.country');
   const temp = $('.temp');
   const desc = $('.description');
   const max = $('.max');
   const min = $('.min');

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
//           console.log(content);

           const cityName = content.name;
           const cityCountry = content.sys.country;
           let cityTemp = content.main.temp;
           let cityTempDesc = content.weather[0].description;
           let tempMax = content.main.temp_max;
           let tempMin = content.main.temp_min;

           $(city).html(cityName);
           $(country).html(cityCountry);
           $(temp).html(`${cityTemp}°C`);
           $(desc).html(cityTempDesc);
           $(max).html(`Máx ${tempMax}`);
           $(min).html(`Min ${tempMin}`);


         });
     });
 });
