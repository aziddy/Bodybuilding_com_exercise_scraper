var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyparser = require("body-parser");
var mysql = require("mysql");
var path = require('path');
var fs = require("fs");
var cheerio = require('cheerio');



var userid = 14782048;

app.set('view engine', 'ejs');
app.use(bodyparser.json());

// used to parse get data in url encode format
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'www')));


// https://www.bodybuilding.com/exercises/finder/1/

// https://www.bodybuilding.com/exercises/finder/73/




var muscle_groups = new Array();


var first = true;





for (var i = 1; i <= 1; i++){
	var options = {  
	    url: ('https://www.bodybuilding.com/exercises/finder/'+i),
	    method: 'GET',
	    headers: {
	        'Accept': 'application/json',
	        'Accept-Charset': 'utf-8',
	        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
	    }
	};
	
	//console.log(i);
	
	request(options, function(err, res, body) {  
		if (err) return console.error(err);
	
	    let $ = cheerio.load(body);
	
	    let results = $('.ExCategory-results');
	    
	    
	
	   // console.log(results.text());
	    
	    $('.ExCategory-results').children('.ExResult-row').each(function (ix, elem) {
		    console.log("----------------------------------------------");
			console.log(ix);
			
			
			var temp_object = {
				exercise_name: $(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExHeading.ExResult-resultsHeading").children("a").html().trim(),
				link: "https://www.bodybuilding.com" + $(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExHeading.ExResult-resultsHeading").children("a").attr('href'),
				muscle_group: $(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-muscleTargeted").children("a").text().trim(),
				equipment_type: $(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-equipmentType").children("a").text().trim(),
				rating: $(this).children(".ExResult-cell.ExResult-cell--rating").children(".ExRating").children(".ExRating-badge").text().trim()
			}
			
			//console.log(elem);
			//console.log($(this).children(".ExResult-cell.ExResult-cell--nameEtc").html());
			//console.log($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExHeading.ExResult-resultsHeading").html());
			
			console.log($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExHeading.ExResult-resultsHeading").children("a").html().trim());
			console.log($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExHeading.ExResult-resultsHeading").children("a").attr('href'));
			
			console.log($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-muscleTargeted").children("a").text().trim());
			
			
			console.log($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-equipmentType").children("a").text().trim());
			console.log($(this).children(".ExResult-cell.ExResult-cell--rating").children(".ExRating").children(".ExRating-badge").text().trim());
			
			
			
			if(first){
				first = false;
				muscle_groups.push($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-muscleTargeted").children("a").text().trim());
			} else {
				
				var already_exists = false;
				
				for(var x = 0; x < muscle_groups.length; x++){
					
					var html_val = $(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-muscleTargeted").children("a").text().trim();
					
					if(muscle_groups[x] == html_val){
						already_exists = true;
						x = muscle_groups.length;
					}
				}
				
				if(!already_exists){
					muscle_groups.push($(this).children(".ExResult-cell.ExResult-cell--nameEtc").children(".ExResult-details.ExResult-muscleTargeted").children("a").text().trim());
				}
				
			}
			
			

			

			
		//	
			
		});
		
		console.log("------------------------------------------------------------------");
		console.log(muscle_groups);
	  
	  
		//console.log(body);
	    //let json = JSON.parse(body);
	    //console.log(json);
	});
	
	
		
	
	
}






/*

http.listen(6432, function() {
	console.log('listening on *:6432');
	//console.log(__dirname);
});*/
