var contacts = require('./contacts.json');
var fs = require('fs');


var names = Array();

var contactsWithoutEmails = contacts.filter(function(contact){
  return(contact.email === null || contact.email === undefined || contact.email === "");
});

var contactsWithNames = contactsWithoutEmails.filter(function(contact){
  return(contact.name !== undefined && contact.name !== null && contact.name !== "");
});

// console.log(contactsWithNames);

contactsWithNames.forEach(function(contact){
  // console.log(contact);
  names.push(contact.name);
});

console.log(names);
console.log(names.length);

saveToCSV(names);

function saveToCSV(names){

  var csv = "";

  names.forEach( function(name){
    csv += name + ",\n";
  });

  var outputFilename = './linkedinNames.csv';

  fs.appendFile(outputFilename, csv, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("CSV saved to " + outputFilename);
      }
  });
}
