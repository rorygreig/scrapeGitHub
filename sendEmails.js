var emailSender = require('./emailUtils.js');
var contacts = require('./contacts.json');

// contacts.forEach(function(contact){
//
// });

var alertSender = 'rory@trademoremargin.com';
var alertPassword = 'C0ns1d3rPhl!!BB';

var email = new emailSender(alertSender, alertPassword, 'zoho');

var alreadySent = [
  "juuso@mail.com",
  "harrison@seaofbtc.com",
  "cheseauxjonathan@gmail.com",
  "galaviz@hybridgroup.com",
  "scarduzio@gmail.com",
  "selcik2@illinois.edu",
  "prinya.pongdontri@gmail.com",
  "github.com@btcchina.com",
  "teward@ubuntu.com",
  "josh@vitamin-j.com",
  "lewis.clayton@forward3d.com",
  "michael@ndrix.org",
  "sean@tox.im",
  "jeffrey.wilcke@icloud.com",
  "thung1@binghamton.edu",
  "james@slickage.com",
  "veox@wemakethings.net",
  "alexxy@gentoo.org",
  "veox@wemakethings.net",
  "ea333@freemail.hu",
  "latchkey@gmail.com",
  "maxime@maximevalette.com",
  "luke+github_public@dashjr.org",
  "lacatusu.valeriu@gmail.com",
  "jakendall@coolacid.net",
  "brendan@jcaffrey.com",
  "tagrain@gmail.com",
  "iam@zfei.me",
  "stephen@pubnub.com",
  "ryan@trycaviar.com",
  "justinarthur@gmail.com",
  "github@trailbeans.eu",
  "support@bitdeli.com",
  "matthewdanielperkins@gmail.com",
  "maxime.biais@gmail.com",
  "418005608@qq.com",
  "julyighor@gmail.com",
  "connor@sphinx.io",
  "aandrewjeski@gmail.com",
  "me@gildedhonour.com",
  "theodore.vanrooy@gmail.com",
  "khertan@khertan.net",
  "rubencallewaertdev@gmail.com",
  "thunman@gmail.com",
  "madaokuan@gmail.com",
  "jackprestonuk@gmail.com",
  "guifre.ruiz@owasp.org",
  "lewis.clayton@forward3d.com",
  "qycpublic@gmail.com",
  "maxc@me.com",
  "github@mathisonian.com",
  "jed@jedsmith.org",
  "nanotube@gmail.com",
  "teppo.salonen@gmail.com",
  "spry@sdf.org"
]

console.log(contacts.length);

var counter = 0;

contacts.forEach(function(contact){
  if(alreadySent.indexOf(contact.email) == -1){
    console.log(contact.email);
    console.log(contact.name);
    console.log(contact.bitcoinrepo);

    email.sendColdEmail(contact.email, contact.name, contact.bitcoinrepo, function(response){
      console.log(response);
      if(response.indexOf("250") > -1){
        alreadySent.push(contact.email);
        console.log("Sent email to: " + contact.email);
        counter++;
      }
    });
  }
});
