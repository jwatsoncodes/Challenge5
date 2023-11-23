
 
  const localeSettings = {};
  dayjs.locale(localeSettings);
  
  $(function () {
    // Get the current hour of the day using the dayjs library.
    const currentHour = dayjs().hour();
  // colour respondant to time
    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', currentHour < blockHour);
        $(this).toggleClass('present', currentHour === blockHour);
        $(this).toggleClass('future', currentHour > blockHour);
      });
    }
  // save function
    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // colour respondant to time
    function refreshColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
//retrieve stored data
    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    //current date and time display
    function updateTime() {
      const dateElement = $('#date');
      const timeElement = $('#time');
      const currentDate = dayjs().format('dddd, MMMM D, YYYY');
      const currentTime = dayjs().format('hh:mm:ss A');
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }
    
    hourlyColor();
    textEntry();                
    refreshColor();
   
    setInterval(updateTime, 1000);
  });

  