var yql = require('yql');
var async = require('async');
var fs = require('fs');

var contacts = Object();
var logins = Array();

var repos = ["nanotube/supybot-bitcoin-marketmonitor"];

var repository = "nanotube/supybot-bitcoin-marketmonitor";
var reponame = "supybot-bitcoin-marketmonitor";
var url = "http://github.com/" + repository + "/graphs/contributors-data";

var getContributorsQuery = "select * from json where url='" + url + "'";

console.log(getContributorsQuery);

new yql.exec(getContributorsQuery, function(response) {
  console.log(response);
  var authors = response.query.results.json.json;
  authors.forEach(function(author){
    logins.push(author.author.login);
  });

  console.log(logins);

  var queryFuncs = Array();

  logins.forEach(function(login){
    contacts[login] = Object();
    var url = "http://github.com/" + login;

    var getEmailQuery = "SELECT * FROM data.html.cssselect WHERE url='" + url + "' AND css='.email'";

    queryFuncs.push(function(callback){
        new yql.exec(getEmailQuery, function(response) {
          // console.log(response.query.results.results);
          if(response.query.results.results != null){
            if(response.query.results.results.a != null){
              var email = response.query.results.results.a.content;
              // console.log(email);
              contacts[login].email = email;
            }
          }
          callback();
        });
    });

    var getNameQuery = "SELECT * FROM data.html.cssselect WHERE url='" + url + "' AND css='.vcard-fullname'";

    queryFuncs.push(function(callback){
        new yql.exec(getNameQuery, function(response) {
          // console.log(response.query.results.results);
          if(response.query.results.results != null ){
            if(response.query.results.results.span != null){
              var name = response.query.results.results.span.content;
              contacts[login].name = name;
            }
          }
          callback();
        });
    });

  });

  async.parallel(queryFuncs, function(){
    console.log(contacts);
    saveFiles(contacts);
    // sendEmails(contacts);
  });

});

// function sendEmails(contacts){
//
// }

function saveFiles(contacts){
  var outputFilename = './contacts'+ reponame +'.json';

  fs.writeFile(outputFilename, JSON.stringify(contacts, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
  });

  var csv = "";

  logins.forEach( function(login){
    if(contacts[login].name !== undefined){
      csv += login + "," + contacts[login].name + "," + contacts[login].email + "\n";
    }
  });

  var outputFilename = './contacts'+ reponame +'.csv';

  fs.writeFile(outputFilename, csv, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("CSV saved to " + outputFilename);
      }
  });
}
