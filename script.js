$(document).ready(function() {
    // variables.
    var date = moment().format('MMMM Do, YYYY');
    var hour = moment().format('hh a');
    var currentTime = moment().format('hh' + ':' + 'mm a');
    var timeOfDay = moment().format('k');
    var timeOfNight = moment().format('a');
    var minuteOfHour = moment().format('m');
    var timeTilNextHour = 60 - minuteOfHour;
    var apptsArr = [{
        time: "9",
        msg: ""
    },{
        time: "10",
        msg: ""
    },{
        time: "11",
        msg: ""
    },{
        time: "12",
        msg: ""
    },{
        time: "13",
        msg: ""
    },{
        time: "14",
        msg: ""
    },{
        time: "15",
        msg: ""
    },{
        time: "16",
        msg: ""
    },{
        time: "17",
        msg: ""
    }];




    // display current date and time in header.
    
    $("#currentDay").text(date).append($('<div>').text(currentTime));


        
    // Update colors to show which blocks are past, present, and future.
    
    updateColors = () => {
        timeTilNextHour = timeTilNextHour * 60 * 1000;
        $(".description").each(function() {
            if((parseInt($(this).attr('data-time')) ) < timeOfDay) {
                $(this).addClass("past");
            };
            if((parseInt($(this).attr('data-time')) ) == timeOfDay) {
                $(this).addClass("present");
            };
            if((parseInt($(this).attr('data-time')) ) > timeOfDay) {
                $(this).addClass("future");
            };
        });
        setTimeout(updateColors, 60 * 60 * 1000);
    }



    // Check time to update colors every hour.

    setTimeout(updateColors, timeTilNextHour);



    // Render key/value to message text space.

    renderMsg = () => {
        for (var i = 0;i < apptsArr.length; i++){
            $(`td[data-time="${apptsArr[i].time}"]`).children("textarea").val(apptsArr[i].msg);
        }
    }



    // Get stored key/value pair from local storage and update array.
    grabAppts = () => {
        var storedAppts = JSON.parse(localStorage.getItem('Appointments'));

        if (storedAppts) {
            apptsArr = storedAppts;
        }
        renderMsg();
    }



    // Save text to local storage on click event.

    $(".saveBtn").on('click', function(event) {
        event.preventDefault();
        var textVal = $(this).prev().children("textarea").val();
        var textTime = $(this).prev().attr("data-time");
        for (var i = 0;i < apptsArr.length; i++){
            if (apptsArr[i].time === textTime){
                apptsArr[i].msg = textVal;
            }
        }
        localStorage.setItem('Appointments', JSON.stringify(apptsArr));
        renderMsg();
    })
    
        
        grabAppts();
});