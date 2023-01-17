$(function() {

   $('button.slide_up').click(function() {
      const taskContainer = $(this).parent().parent();
      taskContainer.toggleClass('active');
   });


});