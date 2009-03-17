/*
* First plugin 
*
* @author Maarten Hus
*/
(function($)
{
    $.fn.ical = function(options) 
    {
        var defaults = {
           daynames: ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'], //default short names for the days of the week
           monthnames: ['Januari', 'Febuari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'October', 'November', 'December'],
           startdate: new Date(), // The date the calender should take as start point
           eventdates: [],
           beforeDay: function (insdate) {},
           beforeMonth: function(insdate) {},
           beforeYear: function(insdate) {}
        };
        
        var options = $.extend(defaults, options);
          
        return this.each(function() 
        {
            var obj = $(this); //get the object
            
            var insdate = options.startdate; //The date that gets used for calculating the month
            createCalendar(obj, insdate);
        });
        
        /**
        * Create the calendar
        */
        function createCalendar(obj, insdate)
        {
            obj.html('');
            createNavigation(obj, insdate);
            createTable(obj); //create table
            addDatesToTable(obj, insdate);
        }
        
        /**
        * Create the navigation and handle its clicks
        */
        function createNavigation(obj, insdate)
        {
            obj.append("<div><span id = 'currentmonth'>"+ options.monthnames[insdate.getMonth()] +"</span> <span id = 'currentyear'>"+ insdate.getFullYear() +"</span></div>" +
                      "<div><span id ='icalprev'><</span><span id ='icalnext'>></span></div>");
                      
            $("#icalnext", obj).click(function()
            {
                var month = insdate.getMonth() + 1;
                
                if(month > 11)
                {
                    month = 0;
                    var year = insdate.getFullYear() + 1;
                    options.beforeYear(formatDate(year, month, 1));
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
                options.beforeMonth(formatDate(year, month, 1));
                
                date = new Date(year, month, 1);
                createCalendar(obj, date);
            }); 
            
            $("#icalprev", obj).click(function()
            {
                var month = insdate.getMonth() - 1;
                
                if(month < 0)
                {
                    month = 11;
                    var year = insdate.getFullYear() - 1;
                    options.beforeYear(formatDate(year, month, 1));
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
                options.beforeMonth(formatDate(year, month, 1));
                
                date = new Date(year, month, 1);
                createCalendar(obj, date);
            });         
        }
        
        /**
        * Create the table for the calendar
        */
        function createTable(obj)
        {
            obj.append("<table cellspacing='0'><thead><tr></tr></thead><tfoot><tr></tr></tfoot></table>"); //add a table 
            
            for (var i = 0; i < options.daynames.length; i++) 
            {
               $("table tr, obj").append("<th>"+ options.daynames[i] +"</th>"); //add the day header
            }
        };
        
        function addDatesToTable(obj, insdate)
        {
            var month = insdate.getMonth();
            var year  = insdate.getFullYear();
            
            var days = getDaysInMonth(year, month);
            var first = getFirstDayOfMonth(year, month); // 0 - 6
            var last = getLastDayOfMonth(year, month, days);// 0 - 6 
            
            var afterpadding = 6 - last; // week minus the last day of the month = afterpadding
            
            var firstrow = true;
            
            for (var i = 1; i <= days; i++) //each day in month
            {
                if((first + i - 1) % 7 === 0 || firstrow === true ) //add new tr for each new monday our if $i is zero
                {
                    $("table", obj).append("<tr></tr>");
                }
                
                for(var j = 0; j < first && firstrow; j++) //add pre padding
                {
                    $("table tr:last, obj").append("<td class = 'padding'></td");
                }
                
                firstrow = false; //no more pre padding
                
                var month = getMonthNumber($("#currentmonth", obj).text());
                var year = $("#currentyear", obj).text();
                
                var formatdate = formatDate(year, month, i);
                
                if(isEventDate(formatdate))
                {
                    options.beforeDay(formatdate);
                    $("table tr:last, obj").append("<td class='date_has_event' id = '"+formatdate+"'>"+ i +"</td"); //add day
                }
                else
                {
                    options.beforeDay(formatdate);
                    $("table tr:last, obj").append("<td id = '"+formatdate+"'>"+ i +"</td"); //add day 
                }
            };
            
            for (var i = 0; i < afterpadding; i++) //add after padding
            {
                $("table tr:last, obj").append("<td class = 'padding'></td");
            }
            
            highlightToday(obj);
        }
        
        function getMonthNumber(month)
        {
            for (var i = 0; i < options.monthnames.length; i++)
            {
                if(options.monthnames[i] === month)
                {
                    return i;
                }
            }
        }
        
        function getDaysInMonth(year, month)
        {
            return 32 - new Date(year, month, 32).getDate();
        }
        
        function highlightToday(obj)
        {
            var today = new Date();
            today = formatDate(today.getFullYear(), today.getMonth(), today.getDate());
            $("#"+today, obj).attr("class", "today");
        }
        
        function isEventDate(date) 
        {
            for (var i = 0; i < options.eventdates.length; i++)
            {
                var evaldate = evaluateEventDate(options.eventdates[i], date);
                
                if(date === evaldate)
                {
                   return true; 
                }
            }
            
            return false;
        }
        
        function evaluateEventDate(eventdate, date)
        {
            var eventdate = eventdate.split('-');
            var date = date.split('-');
            
            if(eventdate[0] === 'yyyy')
            {
                eventdate[0] = date[0];
            }
            
            if (eventdate[1] === 'mm') 
            {
                eventdate[1] = date[1];
            }
            
            if(eventdate[2] === 'dd')
            {
                eventdate[2] = date[2];
            }
            
            return eventdate[0]+'-'+eventdate[1]+'-'+eventdate[2];
        }
        
        function getLastDayOfMonth(year, month, days)
        {
            var date = new Date(year, month, days);
            if(date.getDay() == 0)//we start on monday!
            {
                return 6;
            }
            else
            {
                return date.getDay() -1;
            }
        }
            
        function getFirstDayOfMonth(year, month)
        {
            var date = new Date(year, month, 1);
            if(date.getDay() == 0) //we start on monday!
            {
                return 6;
            }
            else
            {
                return date.getDay() -1;
            }
        }
        
        function formatDate (year, month, day) 
        {    
            return year+'-'+formatMonth(month)+'-'+formatDay(day);
        }
        
        function formatMonth(month)
        {
            month = month + 1;
            
            if (month < 10)
            {
                month = '0'+month;
            }
            
            return month; 
        } 
        
        function formatDay(day)
        {
            if (day < 10) 
            {
                day = '0'+day;
            }
            
            return day;
        }
    };
})(jQuery);