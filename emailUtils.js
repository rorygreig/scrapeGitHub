var nodemailer = require('nodemailer');

var emailSender = function(sender, password, service) {
    this.transporter = setupTransporter(sender, password, service);
    this.sender = sender;
    this.sendColdEmail = sendColdEmail;
    this.sendFollowUpEmail = sendFollowUpEmail;
}

function setupTransporter(sender, password, service){
  // create reusable transporter object using SMTP transport
  return nodemailer.createTransport({
      service: service,
      auth: {
          user: sender,
          pass: password
      }
  });
}

function sendColdEmail(recipient, name, repo, callback){
  //get first name from full name
  var firstName = "there";
  if(name !== null){
    var firstName = name.split(" ")[0];
    if(firstName === undefined){
      firstName = "there";
    }
  }

  var subject = "Bitcoin multi exchange margin trading service for automated traders";

  var message = "<html><body>"
  message += "<div>Hi " + firstName + ",</div><br></br>";
  message += "<div>I've seen that you are a contributor to the " + repo + " bitcoin project on Github.";
  message += " I am getting in touch to see if you would be interested in borrowing bitcoin for trading.</div><br></br>";
  message += "<div>My company, <a href='www.trademoremargin.com'>TradeMore</a>, provides a bitcoin lending service to facilitate leveraged trading for bitcoin traders. We take deposits from lenders who want to earn a return on their bitcoin holdings, and lend these funds to traders like yourself on bitcoin exchanges.</div><br></br>";
  message += "<div>We have a partnership with <a href='www.coinfloor.co.uk'>Coinfloor</a> and are currently offering our service there, but we are also expanding to more exchanges.</div><br></br>";
  message += "<div>If you are interested in our service please let us know. We would love to chat and provide you more details.</div><br></br>";
  message += "<div>Best regards,</div>";
  message += "<div>Rory Greig</div>";
  message += "</body></html>";

  var mailOptions = {
      from: this.sender,
      to: recipient,
      subject: subject,
      html: message
  };

  // send mail with defined transport object
  this.transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          // console.log('Message sent: ' + info.response);
          callback(info.response);
      }
  });

}

function sendFollowUpEmail(recipient, name, repo, callback){
  //get first name from full name
  var firstName = "there";
  if(name !== null){
    var firstName = name.split(" ")[0];
    if(firstName === undefined){
      firstName = "there";
    }
  }

  var subject = "Bitcoin multi exchange margin trading";

  var message = "<html><body>"
  message += "<div>Hi " + firstName + ",</div><br></br>";
  message += "<div>It’s Rory from Trademore here. Just wondering if you got a chance to check out our bitcoin margin trading <a href='www.trademoremargin.com'>service</a>.</div><br></br>";
  message += "<div>We currently have a partnership with the <a href='www.coinfloor.co.uk'>Coinfloor</a> exchange, and we can also provide our service on other exchanges depending on your requirements.</div><br></br>";
  message += "<div>Let us know if you have any questions, we are more than happy to have a chat over the phone to see how we can help you out with Bitcoin trading.</div><br></br>";
  message += "<div>Best regards,</div>";
  message += "<div>Rory Greig</div>";
  message += "</body></html>";

  var mailOptions = {
      from: this.sender,
      to: recipient,
      subject: subject,
      html: message
  };

  // send mail with defined transport object
  this.transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
      }else{
          // console.log('Message sent: ' + info.response);
          callback(info.response);
      }
  });

}

module.exports = emailSender;
