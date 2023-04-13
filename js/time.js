$(document).ready(function(){
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
        
    // Função para atualizar a hora
    function updateTime() {
        const now = new Date();
        const hours = formatTime(now.getHours());
        const minutes = formatTime(now.getMinutes());
        const timeDisplay = `${hours}:${minutes}`;
        $('.title-conditions .today-report').html(timeDisplay);
    }
        
    // Chama a função updateTime a cada vez que o minuto muda
    updateTime();
    setInterval(() => {
        const now = new Date();
        if (now.getSeconds() === 0) {
            updateTime();
        }
    }, 1000);
});