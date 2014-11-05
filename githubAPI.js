var request = require('request');
var async = require('async');
var fs = require('fs');
var http = require('http');

var contacts = Object();
var logins = Array();
var repos = ["askmike/gekko"];

var contributorsURL = "https://api.github.com/repos/" + repos[0] + "/contributors";

// Configure the request
var options = {
    url: contributorsURL,
    method: 'GET',
    headers: {'user-agent': 'node.js'}
}

// Start the request
request(options, function (error, response, body) {
    // console.log(error);
    // console.log(response);
    console.log(body);
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
    }
})

//eg. to get all contributors for a repo: https://api.github.com/repos/timmolter/xchange/contributors
//to get data for a user: https://api.github.com/users/timmolter
