$(function() {
   
      const runMinutes = () => {
         const secondsStick = $('.clock_stick.low_stick');
         const minutesStick = $('.clock_stick.mid_stick');
         const hoursStick = $('.clock_stick.main_stick');
         const deg = 6;
      
         let newDate = new Date();
         let currHours = newDate.getHours() * 30;
         let currMins = newDate.getMinutes() * deg;
         let currSecs = newDate.getSeconds() * deg;
         // alert(currHours);
         secondsStick.css('transform', 'translateX(-50%) rotateZ('+currSecs+'deg)');
         minutesStick.css('transform', 'translateX(-50%) rotateZ('+currMins+'deg)');
         hoursStick.css('transform', 'translateX(-50%) rotateZ('+currHours+'deg)');
         // clockStick.css('transform', 'translateX(-50%) rotateZ('+iDegree+'deg');
      }

 
   setInterval(runMinutes, 1000);




});