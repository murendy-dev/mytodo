$(function() {


   $(document).click(function(e) {

      const thisElements = $('.popup_container');
      const taskButton = $('button.new_task');
      
      if( !thisElements.is(e.target) && thisElements.has(e.target).length === 0 && !taskButton.is(e.target) ) {
         thisElements.removeClass('active');
      }
   });


   $('button.new_task').click(function() {
      $('.popup_container').addClass('active');
   });

   $('button.save_task').click(function() {
      
      const taskTitle = $('input.task_title').val();
      const taskDate = $('input.set_date').val();
      const taskTime = $('input.set_time').val();

      if( taskTitle != '' && taskDate != '' && taskTime != '' ) {
         let appendedItem = taskTitle+'+++'+taskDate+'+++'+taskTime;
         const getExistingTasks = localStorage.getItem('tsk');
         $('.popup_container').removeClass('active');
         if( !getExistingTasks ) {
            localStorage.setItem('tsk', appendedItem);
         }
         else {
            localStorage.setItem('tsk', getExistingTasks+'<>'+appendedItem);
         }

         findAvailableTasks();
         window.location.reload();
      }
      else {
      }
   });




   function findAvailableTasks() {
      if( localStorage.getItem('tsk') ) {
         $('ul.tasks_list').empty();
         let allTasks = localStorage.getItem('tsk');
         let i = 0;
         allTasks = allTasks.split('<>');
         
         allTasks.forEach(taskItem => {
            let activeTask = allTasks[0].split('+++')[0] || 'No tasks';
            let upcomingTask; 
            if( allTasks.length > 1 ) {
               upcomingTask = allTasks[1].split('+++')[0];
            }
            else {
               upcomingTask = 'No tasks available';
            }
            i++;
            let taskValues = taskItem.split('+++');
            let newTaskHtml = '<li class="task_wrapper" data-id=" '+i+' "><div class="list_num">'+i+'</div><div class="group_items"><p>'+taskValues[0]+'</p><div class="created_date"><span>'+taskValues[1]+', '+taskValues[2]+'</span></div></div> <button class="float_btn delete_task"><i class="ri ri-delete-bin-2-line"></i></button></li>';

            $('ul.tasks_list').append(newTaskHtml);
            $('.current_activity p').html(activeTask);
            $('.upcoming_activity p span').html(upcomingTask);
            
         });
      }
   }
   findAvailableTasks();


   function taskExpiry() {
      if( localStorage.getItem('tsk') ) {
         let allTasks = localStorage.getItem('tsk');
         let currTask = allTasks.split('<>')[0];
         let nextTask = allTasks.split('<>')[1];

         let getTaskDate = currTask.split('+++')[1];
         let getTaskTime = currTask.split('+++')[2];

         let nextTaskDate = nextTask.split('+++')[1];
         let nextTaskTime = nextTask.split('+++')[2];
         
         const currTaskDate = new Date(getTaskDate +' '+ getTaskTime).toDateString();
         const currTaskTime = new Date(getTaskDate+' '+getTaskTime).toTimeString().slice(0, 8);

         const upTaskDate = new Date(nextTaskDate +' '+ nextTaskTime).toDateString();
         const upTaskTime = new Date(nextTaskDate +' '+ nextTaskTime).toTimeString().slice(0, 8);

         let currLocalDate = new Date().toDateString();
         let currLocalTime = new Date().toTimeString().slice(0, 8);

         const countDown = () => {
            let currTaskStamp = new Date(nextTaskDate +' '+ nextTaskTime).getTime();
            let currLocalStamp = new Date().getTime();
            let timeGap = currTaskStamp - currLocalStamp;

            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;

            let createDays = Math.floor(timeGap / day);
            let createHours = Math.floor((timeGap % day ) / hour);
            let createMins = Math.floor((timeGap % hour ) / minute);
            let createSecs = Math.floor((timeGap % minute ) / second);

            if( createDays < 10 ) createDays = '0'+createDays;
            if( createHours < 10 ) createHours = '0'+createHours;
            if( createMins < 10 ) createMins = '0'+createMins;
            if( createSecs < 10 ) createSecs = '0'+createSecs;
            
            if( timeGap > 999) {
               $('.time_elapse h1.counter').text(createDays +':'+ createHours +':'+ createMins +':'+ createSecs);
            }
            else {
               let tasksList = localStorage.getItem('tsk');
               let tasks = tasksList.split('<>');

               if( tasks.length > 1 ) {
                  tasks.splice(0, 1);
                  for( let i = 0; i < tasks.length -1; i += 1 ) {
                     tasks[i] = tasks[i] + '<>';
                  }
                  tasks = tasks.join('');
                  localStorage.setItem('tsk', tasks);
                  window.location.reload();
               }
            }
         }

         let oldTaskStamp = new Date(nextTaskDate +' '+ nextTaskTime).getTime();
         let oldLocalStamp = new Date().getTime();
         let timeGap = oldTaskStamp - oldLocalStamp;

         if( timeGap >= 1 ) {            
            let currHours = currLocalTime.split(':')[0];
            let currMins = currLocalTime.split(':')[1];
            let currSecs = currLocalTime.split(':')[2];
            
            let nextHours = currTaskTime.split(':')[0];
            let nextMins = currTaskTime.split(':')[1];
            let nextSecs = currTaskTime.split(':')[2];

               setInterval(countDown, 1000);
         }
      }

   }

   taskExpiry();

   $('button.delete_task').click(function() {
      const taskIndex = parseInt($(this).parent().attr('data-id'));
      $('.permit_container').attr('data-id', taskIndex-1);
      $('.bg_cover').addClass('active');

   });

      $('.permit_container button.confirm_btn').click(function() {
         taskIndex = $(this).parent().parent().attr('data-id');
         if( taskIndex >= 0 ) {
            let allTasks = localStorage.getItem('tsk');
            let tasks = allTasks.split('<>');
            tasks.splice(taskIndex, 1);
            for( let i = 0; i < tasks.length -1; i += 1 ) {
               tasks[i] = tasks[i] + '<>';
            }
            tasks = tasks.join('');
            localStorage.setItem('tsk', tasks);
            window.location.reload();
         }

      });


   $('.permit_container button.cancel_btn').click(function() {
      $('.bg_cover').removeClass('active');
   });

});