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
           startdate: new Date() // The date the calender could take as reference point
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
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
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
                }
                else
                {
                    var year = insdate.getFullYear();    
                }
                
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
            var first = getFirstDayOfMonth(year, month);
            var last = getLastDayOfMonth(year, month, days);
            
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
                
                $("table tr:last, obj").append("<td id = '"+year+"-"+month+"-"+i+"'>"+ i +"</td"); //add day
                
            };
            
            for (var i = 0; i < afterpadding; i++) //add after padding
            {
                $("table tr:last, obj").append("<td class = 'padding'></td");
            }
            
            highlightToday(obj);
        }
        
        function getMonthNumber(month)
        {
            for (var h = 0; h < options.monthnames.length; h++)
            {
                if(options.monthnames[h] === month)
                {
                    return h;
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
            $("#"+today.getFullYear()+"-"+today.getMonth()+"-"+today.getDate(), obj).attr("class", "today");
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
    };
})(jQuery);