$(document).ready(function(){
    let nowDate = new Date();
    let day = nowDate.getDate();
    let month = nowDate.getMonth() + 1;
    let year = nowDate.getFullYear();

    let hour = nowDate.getHours();
    let minute = nowDate.getMinutes();
    let date = day + "/" + month + "/" + year;
    let time = hour + "h:" + minute + "min";

    $('.date').html(date);
    $('.time').html(time);
});