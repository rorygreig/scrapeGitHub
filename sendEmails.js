var emailSender = require('./emailUtils.js');
var contacts = require('./contacts.json');

// contacts.forEach(function(contact){
//
// });

var alertSender = 'rory@trademoremargin.com';
var alertPassword = 'C0ns1d3rPhl!!BB';

var email = new emailSender(alertSender, alertPassword, 'zoho');

email.sendColdEmail("rorygreig@gmail.com", "Rory Greig", "Coinfloor");
email.sendColdEmail("stewartkdouglas@gmail.com", "Stewart", "Coinfloor");
