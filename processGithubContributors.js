var yql = require('yql');
var async = require('async');
var fs = require('fs');

var contacts = Array();
var logins = Array();

var repository = "timmolter/XChange";
var url = "http://github.com/" + repository + "/graphs/contributors-data";

var getContributorsQuery = "select * from json where url='" + url + "'";

console.log(getContributorsQuery);

new yql.exec(getContributorsQuery, function(response) {
  var authors = response.query.results.json.json;
  authors.forEach(function(author){
    // console.log(author.author.login);
    logins.push(author.author.login);
  });

  console.log(logins);

  var queryFuncs = Array();

  logins.forEach(function(login){
    var contact = Object();
    contact.login = login;
    var url = "http://github.com/" + login;
    var getEmailQuery = "SELECT * FROM data.html.cssselect WHERE url='" + url + "' AND css='.email'";

    queryFuncs.push(function(callback){
        new yql.exec(getEmailQuery, function(response) {
          if(response.query.results.results != null){
            var email = response.query.results.results.a.content;
            contact.email = email;
          }
          contacts.push(contact);
          callback();
        });
    });
  });

  async.parallel(queryFuncs, function(){
    console.log(contacts);
    var outputFilename = './contacts.json';

    fs.writeFile(outputFilename, JSON.stringify(contacts, null, 4), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputFilename);
        }
    });
  });

});

function getEmails( logins ){
}
