var emailSender = require('./emailUtils.js');
var contacts = require('./contacts.json');
var async = require('async');

var alertSender = 'rory@trademoremargin.com';
var alertPassword = 'C0ns1d3rPhl!!BB';

var email = new emailSender(alertSender, alertPassword, 'zoho');

var excludedEmails = [
  "david.francois@webflows.fr",
  "vassilis@graffiti.net",
  "axl@todojuegos.com",
  "erland@lewin.nu",
  "mezrinv@gmail.com",
  "bryan4887@gmail.com",
  "piotr.ladyzynski@gmail.com",
  "byvoid@byvoid.com",
  "krystian.nowak@gmail.com",
  "r.krupinski@gmail.com",
  "kpysniak@gmail.com",
  "veken0m.apps@gmail.com",
  "g.rowe@froot.co.uk",
  "zhoushuqun@gmail.com",
  "james.p.edwards42@gmail.com",
  "matija.mazi@gmail.com",
  "nick@addisonbrown.com.au",
  "marinostheoharis@gmail.com",
  "matej.jack@gmail.com",
  "miles.chet@gmail.com",
  "linkedin@campbx.com, keyur@campbx.com",
  "eric.von.guttenberg@gmail.com",
  "marin.basic02@gmail.com",
  "christos.porios@gmail.com",
  "eric_jang@brown.edu",
  "thisisforschool3@gmail.com",
  "migrap@gmail.com",
  "mikael@wikman.me",
  "jay.y.berg@gmail.com",
  "harounkola@gmail.com",
  'michael@ultrapresence.net',
  'sam.clare78@gmail.com',
  'tadej.tadej@gmail.com',
  'oskar.paolini@gmail.com',
  'marzell.camenzind@gmail.com',
  'carl@centrabit.com',
  'spry@sdf.org',
  'teppo.salonen@gmail.com',
  'github@mathisonian.com'
];

console.log(contacts.length);

var counter = 0;

var sentEmails = Array();
var emailFuncs = Array();

contacts.forEach(function(contact){
  if(excludedEmails.indexOf(contact.email) == -1){
    if(contact.email !== undefined && contact.email !== null && contact.email !== ""){
      console.log('\n');
      console.log(contact.email);
      console.log(contact.name);
      console.log(contact.bitcoinrepo);

      emailFuncs.push(function(callback){
          console.log('\n');
          console.log(contact.email);

          email.sendFollowUpEmail(contact.email, contact.name, contact.bitcoinrepo, function(response){
            console.log(response);
            if(response.indexOf("250") > -1){
              sentEmails.push(contact.email);
              console.log("Sent email to: " + contact.email);
              counter++;
              callback();
            }
          });
        });

    } else {
      console.log("email undefined");
    }
  }
});

async.series(emailFuncs, function(){
  console.log(sentEmails);
  console.log("Sent " + sentEmails.length + " emails");
  excludedEmails = excludedEmails.concat(sentEmails);
  saveToJSON(excludedEmails);
});

function saveToJSON(contacts){
  var outputFilename = './excludedEmails.json';

  fs.appendFile(outputFilename, JSON.stringify(contacts, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
  });

}
