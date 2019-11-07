
(function ($) {
  "use strict";


  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });



  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Header scroll class
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (! $('#header').hasClass('header-scrolled')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('menu-active menu-item-active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('menu-active menu-item-active');
      }
    });
  });

})(jQuery);




var header = document.querySelector('header');
var section = document.querySelector('section');
var datasec=document.querySelector('#data');



var halfhourdata = null;

var halfhour = new XMLHttpRequest();
halfhour.withCredentials = true;

halfhour.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

halfhour.open("GET", "https://api.octopus.energy/v1/electricity-meter-points/1200060064515/meters/16P2252425/consumption/");
halfhour.setRequestHeader("Authorization", "Basic c2tfbGl2ZV9EV2dIUlNBYTVwVTQyTWtNa1UyWTB4MW06");
halfhour.setRequestHeader("User-Agent", "PostmanRuntime/7.15.2");
halfhour.setRequestHeader("Accept", "*/*");
halfhour.setRequestHeader("Cache-Control", "no-cache");
halfhour.setRequestHeader("Postman-Token", "a1b4a67b-7fac-4f90-9d76-bc784d993f99,40abab62-9524-4bcd-8a22-59f5c63a0cdd");
halfhour.setRequestHeader("Host", "api.octopus.energy");
halfhour.setRequestHeader("Accept-Encoding", "gzip, deflate");
halfhour.setRequestHeader("Connection", "keep-alive");
halfhour.setRequestHeader("cache-control", "no-cache");
halfhour.setRequestHeader("Access-Control-Allow-Origin","*");

halfhour.send(halfhourdata);


halfhour.onload = function() {
  var energydata = JSON.parse(halfhour.response);
var resultsdata=energydata.results;

plotgraph(resultsdata,"#usagechart",findminimum(resultsdata));
plottext(findminimum(resultsdata),"#usagelabel");








return resultsdata;
}




var dailydata = null;

var daily = new XMLHttpRequest();
daily.withCredentials = true;

daily.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

daily.open("GET", "https://api.octopus.energy/v1/electricity-meter-points/1200060064515/meters/16P2252425/consumption/?group_by=day");
daily.setRequestHeader("Authorization", "Basic c2tfbGl2ZV9EV2dIUlNBYTVwVTQyTWtNa1UyWTB4MW06");

daily.setRequestHeader("User-Agent", "PostmanRuntime/7.15.2");
daily.setRequestHeader("Accept", "*/*");
daily.setRequestHeader("Cache-Control", "no-cache");
daily.setRequestHeader("Postman-Token", "081f1f70-bb8d-413a-a14b-b45a377499a1,8114011d-f13a-4d13-8506-47e8ea02737b");
daily.setRequestHeader("Host", "api.octopus.energy");
daily.setRequestHeader("Accept-Encoding", "gzip, deflate");
daily.setRequestHeader("Connection", "keep-alive");
daily.setRequestHeader("Access-Control-Allow-Origin","*");

daily.send(dailydata);

daily.onload = function() {
  var energydata = JSON.parse(daily.response);
var resultsdata=energydata.results;

plotgraph(resultsdata,"#dailychart",(0.028*48));


return resultsdata;
}


var weeklydata = null;

var weekly = new XMLHttpRequest();
weekly.withCredentials = true;

weekly.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

weekly.open("GET", "https://api.octopus.energy/v1/electricity-meter-points/1200060064515/meters/16P2252425/consumption/?group_by=week");
weekly.setRequestHeader("Authorization", "Basic c2tfbGl2ZV9EV2dIUlNBYTVwVTQyTWtNa1UyWTB4MW06");
weekly.setRequestHeader("User-Agent", "PostmanRuntime/7.15.2");
weekly.setRequestHeader("Accept", "*/*");
weekly.setRequestHeader("Cache-Control", "no-cache");
weekly.setRequestHeader("Postman-Token", "081f1f70-bb8d-413a-a14b-b45a377499a1,8114011d-f13a-4d13-8506-47e8ea02737b");
weekly.setRequestHeader("Host", "api.octopus.energy");
weekly.setRequestHeader("Accept-Encoding", "gzip, deflate");
weekly.setRequestHeader("Connection", "keep-alive");
weekly.setRequestHeader("cache-control", "no-cache");
weekly.setRequestHeader("Access-Control-Allow-Origin","*");

weekly.send(weeklydata);

weekly.onload = function() {
  var energydata = JSON.parse(weekly.response);
var resultsdata=energydata.results;

plotgraph(resultsdata,"#weeklychart",(0.028*48*7));


return resultsdata;
}


//find the minimum of an array to work out always on

function findminimum(input){

var minimum = 999

for (var i=0; i < input.length;i++){

  if (input[i].consumption < minimum ){

    minimum=input[i].consumption;
    console.log(minimum)

  }

}
 return minimum
}









function listAllData(jsonObj) {
var alldata=document.createElement('div');
alldata.textContent = JSON.stringify(jsonObj);
datasec.appendChild(alldata);
}



function showData(jsonObj) {
  var usage = jsonObj;

  for (var i = 0; i < usage.length; i++) {
    var twoArt = document.createElement('div');
    var myDay = document.createElement('h4');
    var myConsumption= document.createElement('p');
    var myWeekday=document.createElement('h5');
    var myDate= new Date(usage[i].interval_start);



    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



    myDay.textContent = Date(usage[i].interval_start);
    myConsumption.textContent = usage[i].consumption + ' Units';
    myWeekday.textContent =   myDate.format("dd-mmm-yy, hh:MM");
    twoArt.appendChild(myDay);
    twoArt.appendChild(myWeekday);
    twoArt.appendChild(myConsumption);

    datasec.appendChild(twoArt);
  }

}

function plottext(text,container){


  var panel=document.querySelector(container);
  var content= document.createElement('p');
  content.textContent=text

  panel.appendChild(content);
        }




//Graphing

function plotgraph(inputdata,location,constant) {


      // set the dimensions of the canvas
      var margin = {top: 20, right: 20, bottom: 100, left: 50},
          width = 1500 - margin.left - margin.right,
          height = 600 - margin.top - margin.bottom;


      // set the ranges
      var x = d3.scale.ordinal().rangeRoundBands([width, 0], .05);

      var y = d3.scale.linear().range([height, 0]);

      // define the axis
      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom")


      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);


      // add the SVG element
      var svg = d3.select(location).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


      // load the data
  //    d3.json("data1.json", function(error, data) {


var data = inputdata;

          data.forEach(function(d) {
              d.interval_start = new Date(d.interval_start) ;
              d.interval_start = d.interval_start.format("dd-mmm-yy, hh:MM TT");
              d.consumption = +d.consumption;
          });

        // scale the range of the data
        x.domain(data.map(function(d) { return d.interval_start ; }));
        y.domain([0, d3.max(data, function(d) { return d.consumption*0.1423; })]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-45)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Usage");


        // Add bar chart


        svg.selectAll("bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.interval_start ); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.consumption*0.1423); })
            .attr("height", function(d) { return height - y(d.consumption*0.1423); });

            svg.selectAll("bar2")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar2")
                .attr("x", function(d) { return x(d.interval_start ); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(constant); })
                .attr("height", function(d) { return height - y(constant); });










}
  //    });











  //Dateformat predefined function


var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};


console.log("hello");
