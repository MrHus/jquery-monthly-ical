#jquery-monthly-ical

Is a dynamic jquery implementation of Stefano Verna's ical jquery month calendar.

http://www.stefanoverna.com/log/create-astonishing-ical-like-calendars-with-jquery

##Examples:

##Basic: Only highlights today's date. And takes today as the starting point to show the calendar.

	$(document).ready(function()
	{	
		$("#ical").ical();
	});

##Non default startdate: Take another date as the startdate.

	$(document).ready(function()
	{	
		$("#ical").ical({
			startdate: new Date(2009, 11, 25) //month starts at 0 so 11 is december
		});
	});

##Events: Get a coda bubble showing some event.

	$(document).ready(function()
	{	
		$("#ical").ical({
		
			eventdates: [{"date": "2009-03-21", "title": "My birthday", "desc": "Its my birthday!"},
					 	 {"date": "yyyy-01-01", "title": "New Year", "desc": "Its a new year!"},
					 	 {"date": "2009-mm-01", "title": "New Month", "desc": "First day of the new month!"},
					 	 {"date": "2010-mm-01", "title": "New Month", "desc": "First day of the new month!"},
					 	 {"date": "2010-09-01", "title": "Convention", "desc": "September convention."}, 
					 	 {"date": "2010-09-02", "title": "Convention", "desc": "September convention day two."}, 
					 	 {"date": "2010-mm-01", "title": "Towl", "desc": "Dont forget to bring a towl."}	
						]					
		});
	});

Eventdates take a date in yyyy-mm-dd format. You can also add wildcards if you want every date to be special
you can add {"date": "yyyy-mm-dd", "title": "Its allways someones birthday!", "desc": "Party"}

Hooks:

beforeDay(date) //Gets executed before each day is added to the calendar.
beforeMonth(date) //Gets executed before each month is rendered.
beforeYear(date)// Gets executed before the new year is rendered.

##Ajax: 
If you have many eventdates you may want to use ajax to load them more efficiently.
Will use beforeMonth in this example, and action.php to change the eventdates.
	
	$(document).ready(function()
	{	
		$("#ical").ical({
			beforeMonth:function(date)
			{
				$.ajax({
					type: "GET",
					url: "action.php",
					dataType: "json",
					data: "date="+date,
					async: false, //stop rendering the calender until eventdates is changed.
					success: function(json){
					    $.fn.ical.changeEventDates(json); //this function changes the eventdates
					}   
				})
			}	
		});
	});


##Sunday
You can also set the start of the week on Sunday:

	$(document).ready(function()
	{	
		$("#ical").ical({
			startOnSunday: true,
			daynames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
		});
	});

##More options
You can also use some other options. **daynames** and **monthnames** could be used for translations.

    $(document).ready(function(){
        $('#ical').ical({
            daynames: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'], //default short names for the days of the week
            monthnames: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            displayDaysInLastRow: true, // Boolean. Display or not the week days in the last row
        });
    });
