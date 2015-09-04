var $ = require('jquery');
var css = require('./style.css');
'use strict';
$(document).ready(init);

function init() {
  var e;
 var autoLocatePromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/geolookup/q/autoip.json");
  autoLocatePromise.success(function(data) {
  var city = data.location.city;
  var state = data.location.state;
  var location = state + '/' + city;
  goClicked(location, e);

  $('#go').click(goClicked);
  $('input').keypress(inputKeypress); 
  })
}


function inputKeypress(e) {
  if (e.which === 13) {
    goClicked(e);
  }
}

function goClicked(location, e) {
  var city, state;
  if ($('.location').val()) {
    location = $('.location').val()
    if (/\d/.test(location) === false) {
      var locationArr = location.split(',');
      city = locationArr[0];
      state = locationArr[1];
      location = state + "/" + city; 
    }
  }

  var currentPromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/conditions/q/" + location + ".json");
  currentPromise.success(function(data) {
    var F = data.current_observation.heat_index_f;
    var icon_url = data.current_observation.icon_url;
    var icon = data.current_observation.icon;
    city = data.current_observation.display_location.city;
    state = data.current_observation.display_location.state;
    if (icon = 'clear') {
    $('body').addClass('sunny');
    }
    $('.currentInfo').empty();
    var $currentInfoArr = [];
    if ( F !== 'NA'){
      $currentInfoArr.push(F + '° Farenheight');
    } else {
      $currentInfoArr.push("<div>" + data.current_observation.feelslike_f + '° Fahrenheit</div>');
    }
    $currentInfoArr.push("<img src='" + icon_url + "'>");
    $currentInfoArr.push("<div>" + city + ',' + state + "</div>");
    $('.currentInfo').append($currentInfoArr);

    console.log($currentInfoArr);
    console.log($('.currentInfo'));

      var $radar = $('.radar')
      $radar.empty();
      $radar.append("<img src='http://api.wunderground.com/api/a741b0d8e5cdb448/animatedradar/q/" + state + '/' + city + ".gif?newmaps=1&timelabel=1&timelabel.y=10&num=5&delay=50' id='radar'>" );
  

  });
  currentPromise.fail(function(error) {
    console.log('error:', error);
  });

  var forecastPromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/forecast/q/" + location + ".json");
  forecastPromise.success(function(data) {
    var forecastArr = data.forecast.simpleforecast.forecastday;
    var divArr = [];
    forecastArr.forEach( function(element,index,array) {
    var icon = array[index].icon_url;
    var date = array[index].date.weekday;
    var high = array[index].high.fahrenheit;
    var low = array[index].low.fahrenheit;
    var $divID = $("<div id=" +  date + ">");
    $divID.append("<img src='" + icon + "'>").append('<span>' + date + '</span>').append('<span> High: ' + high + ' ° F</span>').append('<span> Low: ' + low + '° F</span>');
    divArr.push($divID);
  })
    $('#forecast').empty().append(divArr);
      var webcamPromise = $.ajax("http://api.wunderground.com/api/a741b0d8e5cdb448/webcams/q/" + location + ".json");
      webcamPromise.success(function(data) {
      var image_url = data.webcams[0].CURRENTIMAGEURL;
      $('#forecast').append('<span>Closest webcam:</span><br>').append("<img src='" + image_url + "' id='webcam'>");
  })
  })

}
