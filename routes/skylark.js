var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var router = express.Router();

router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true }));

var mysql = require('mysql');
var connection_config = require("./connection");
var connection = mysql.createPool(connection_config);


/* GET Retrieves data in datastore */
router.get('/coordinates/', function(req, res, next) {
	// Establish connection frmo database
 	connection.getConnection(function(error, tempConnection){
		if(!!error) {
			tempConnection.release();
			console.log("Error: DB Connection");
		}
		else {
			var response = {};
			var code = req.params.code;

			// Assign status header
			// Default to 200
			var status = 200; 
			
			// Query to fetch data from DB
			tempConnection.query("select * from coordinates", function(err, rows, fields) {
				tempConnection.release();
				if (!err)
			  	{
			  		numRows = rows.length;

			   		if(rows.length!=0){
			    		response = {success: rows};
			   		}
			    	else{
			      		response = {error:'Coordinates not found'};
			      		status = 400;
			    	}
			  	}
			  	else
			  	{
				    console.log(err);
			  	}
				res.status(status).json(response);  
			});
		}
	});
});

/* GET Retrieves data in datastore */
router.get('/city/details/:lat/:lng', function(req, res, next) {
	// Establish connection frmo database
 	connection.getConnection(function(error, tempConnection){
		if(!!error) {
			tempConnection.release();
			console.log("Error: DB Connection");
		}
		else {
			var response = {};
			var lat = req.params.lat;
			var lng = req.params.lng;

			// Assign status header
			// Default to 200
			var status = 200; 
			
			// Query to fetch data from DB
			tempConnection.query("select cd.description, cd.area, cd.website, c.lat, c.lng, c.city_name from city_details cd left join coordinates c on cd.city_id = c.id where lat = ? and lng = ?", [lat, lng], function(err, rows, fields) {
				tempConnection.release();
				if (!err)
			  	{
			  		numRows = rows.length;

			   		if(rows.length!=0){
			    		response = {success: rows};
			   		}
			    	else{
			      		response = {error:'Error'};
			      		status = 400;
			    	}
			  	}
			  	else
			  	{
				    console.log(err);
			  	}
				res.status(status).json(response);  
			});
		}
	});
});

/* POST Validates IEC with company name on Gov website */
router.post('/:code/:name', function(req, res, next) {
	// Establish connection frmo database
 	connection.getConnection(function(error, tempConnection){
		if(!!error) {
			tempConnection.release();
			console.log("Error: DB Connection");
		}
		else {
			var response = {};
			var code = req.params.code;
			var name = req.params.name;

			// Assign status header
			// Default to 200
			var status = 200; 
			
			// Query to fetch data from DB
			// select * from iec_code_details where code_id in (select id from iec_master where code = ?) and party_name like ?			
			tempConnection.query("select icd.*, im.code from iec_code_details icd left join iec_master im on icd.code_id = im.id where im.code = ? and icd.party_name like ?", [code, name + '%'] , function(err, rows, fields) {
				tempConnection.release();
				if (!err)
			  	{			    	
			  		numRows = rows.length;

			   		if(rows.length!=0)
			    		response = {success: rows};
			    	else{
			      		response = {error:'The name given by you does not match with the data OR you have entered less than three letters'};
			      		status = 400;
			    	}
			  	}
			  	else
			  	{
				    console.log(err);
			  	}
				res.status(status).json(response);  
			});
		}
	});
});

module.exports = router;