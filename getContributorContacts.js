var async = require('async');
var fs = require('fs');
var GitHubApi = require("github");

var contacts = Object();
var logins = Array();

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    timeout: 5000
});

var githubUserName = process.argv[2];
var githubPassWord = process.argv[3];

github.authenticate({
    type: "basic",
    username: githubUserName,
    password: githubPassWord
});

var repos = [
              {user: "nanotube", repo: "supybot-bitcoin-marketmonitor"},
              {user: "goteppo", repo: "ArBit"},
              {user: "Sprylitol", repo: "btc-e_Trade_bot"},
              {user: "hyppo", repo: "Redbit"},
              {user: "mathisonian", repo: "benjamin"},
              {user: "wildbunny", repo: "bitcoinTradingFramework"},
              {user: "therussianphysicist", repo: "btc-trader"},
              {user: "JulyIGHOR", repo: "QtBitcoinTrader"},
              {user: "maxme", repo: "bitcoin-arbitrage"},
              {user: "gferrin", repo: "bitfinex"},
              {user: "lookfirst", repo: "bitfinex-promise"},
              {user: "ziggamon", repo: "node-bitcoin-trader"},
              {user: "Sea-of-BTC", repo: "Bitcoin-Trading-Client"},
              {user: "ipsBruno", repo: "trade-bot-btce"},
              {user: "maxcountryman", repo: "cryptotrade"},
              {user: "guifre", repo: "BTCWolf"},
              {user: "brandonrobertz", repo: "virtualcurrency-trading-alerts"},
              {user: "cheseaux", repo: "BitcoinTradingSystem"},
              {user: "pubnub", repo: "pubnub-bitcoin"},
              {user: "pentarh", repo: "btctrading-lib"},
              {user: "jwilkins", repo: "bitfinex"},
              {user: "scottbarr", repo: "bitfinex"},
              {user: "golikcoin", repo: "BitFinex"},
              {user: "v4n", repo: "bitfinex"},
              {user: "coolacid", repo: "bfxtrade"},
              {user: "npp1993", repo: "bitfinex-api"},
              {user: "gitmens", repo: "BitfinexToday"},
              {user: "twobeeb", repo: "BitfinexAPI"},
              {user: "KobeLeysen", repo: "BitfinexAPI"},
              {user: "fractaldroid", repo: "bitfinex_orderbook"},
              {user: "velhoti", repo: "Cbot-Bitfinex"},
              {user: "NoWayHoze", repo: "nowayhoze.bitfinex"},
              {user: "evdubs", repo: "Harmonia"},
              {user: "MarkusTeufelberger", repo: "bitfinex2ledger"},
              {user: "caktux", repo: "bitfinex_api_python"},
              {user: "mariodian", repo: "bitfinex-auto-lend"},
              {user: "NoWayHoze", repo: "b___del_this"},
              {user: "dutchcoders", repo: "tradecollector"},
              {user: "cassus", repo: "btc-trader"},
              {user: "cthunman", repo: "btc_py_arb"},
              {user: "Herka", repo: "Bitcoin-Python-Livecharts"},
              {user: "sam808", repo: "mint-bitcoin"},
              {user: "brendanjcaffrey", repo: "bitcoin-notification-center-widget"},
              {user: "wijagels", repo: "btc-price-check"},
              {user: "pentarh", repo: "btctrading-lib"},
              {user: "tech-no-crat", repo: "bitcoineer"},
              {user: "kushti", repo: "btce-scala"},
              {user: "orangeudav", repo: "bitcoin_tools"},
              {user: "aandrewjeski", repo: "arcade"},
              {user: "ericjang", repo: "cryptocurrency_arbitrage"},
              {user: "kevinjcash", repo: "bitbot"},
              {user: "ssgier", repo: "Brahmian2"},
              {user: "pejrak", repo: "stampede"},
              {user: "kanybal", repo: "bitcoins"},
              {user: "towski", repo: "bitcoin_trader"},
              {user: "mateodelnorte", repo: "coinbase"},
              {user: "trexmatt", repo: "OKCoin-API"},
              {user: "siclark", repo: "btcchina"},
              {user: "opaolini", repo: "python-bitcurex"},
              {user: "voidloop", repo: "krakenapi"},
              {user: "5an1ty", repo: "kraken-api"},
              {user: "Beldur", repo: "kraken-go-api-client"},
              {user: "veox", repo: "python3-krakenex"},
              {user: "yfme", repo: "BTCChinaTrade"},
              {user: "dyzz", repo: "btcchina"},
              {user: "TerrorJack", repo: "btcchina.py"},
              {user: "zfei", repo: "btcchina-bot"},
              {user: "tjulk", repo: "Btcchina"},
              {user: "siclark", repo: "btcchina"},
              {user: "qinjiandong2010", repo: "btcchina"},
              {user: "GeforceLee", repo: "BtcChina"},
              {user: "prinyap", repo: "btcchina"},
              {user: "shallwe", repo: "btcchina_agent"},
              {user: "Lewis-Clayton", repo: "Kublai"},
              {user: "BTCChina", repo: "btcchina-api-cpp"},
              {user: "BTCChina", repo: "btcchina-websocket-api-python"},
              {user: "hemon", repo: "btcchina-php-sdk"},
              {user: "domnli", repo: "btcchina.api"},
              {user: "agent462", repo: "chinashop"},
              {user: "sathoro", repo: "BTCChina-MarketMaker"},
              {user: "osleg", repo: "btcchinaBot"},
              {user: "Shieffan", repo: "btcchina_deal"},
              {user: "lamassu", repo: "lamassu-btcchina"},
              {user: "dasixi", repo: "bitbot-btcchina"},
              {user: "shuaishuai", repo: "btcchina-cli"},
              {user: "buluzhai", repo: "btcchina-enhancement"},
              {user: "xianda", repo: "btcchina-python-api"},
              {user: "goace", repo: "bitcoin-ticker"},
              {user: "wulinlw", repo: "btcchina_php_api"},
              {user: "carica", repo: "btcchina-websocket-api"},
              {user: "kasuganosora", repo: "nodeBtcchinaapi"},
              {user: "rarach", repo: "exchange-bots"},
              {user: "tonychee7000", repo: "BtcChinaRT"},
              {user: "sirkapore", repo: "kraken_watch"},
              {user: "greentheo", repo: "krakenForR"},
              {user: "pstauble", repo: "BTC-Trend-Algorithm"},
              {user: "veox", repo: "krakenex"},
              {user: "payward", repo: "kraken-api-client"},
              {user: "nothingisdead", repo: "npm-kraken-api"},
              {user: "kraken-io", repo: "kraken-ruby"},
              {user: "leishman", repo: "kraken_ruby"},
              {user: "Jonahss", repo: "bitstamp-request"},
              {user: "logicalwire", repo: "bitstamp-API"},
              {user: "canselcik", repo: "bitstamp_stoploss"},
              {user: "francesco-bracchi", repo: "bitstamp-api"},
              {user: "jdilag", repo: "bitstamp-angular"},
              {user: "michie1", repo: "Bitstamp-notifier"},
              {user: "9uuso", repo: "bitstamp-vwap"},
              {user: "tgerring", repo: "bitstamp-js"},
              {user: "BitcoinMafia", repo: "bitstamp_api"},
              {user: "PamExx", repo: "Bitcoin---Bitstamp"},
              {user: "sirloins", repo: "bitstamp_utils"},
              {user: "makevoid", repo: "bitstamp_bot"},
              {user: "jesuRule", repo: "custom_bitstamp"},
              {user: "socec", repo: "bitstamp-simple"},
              {user: "maxtsepkov", repo: "nodejs-bitstamp2"},
              {user: "liw0", repo: "pyBitstampTicker"},
              {user: "conejoninja", repo: "bitstamp-php-api"},
              {user: "LuKaa", repo: "Bitstamp-API-CSharp"},
              {user: "ghandmann", repo: "perl-webservice-bitstamp"},
              {user: "alstonfernandez21", repo: "bitstamp_python_api"},
              {user: "ericcj24", repo: "bitstamp.api.monitor1"},
              {user: "peawormsworth", repo: "Finance-BitStamp-Socket"},
              {user: "kojnapp", repo: "bitstamp"},
              {user: "askmike", repo: "bitstamp"},
              {user: "migrap", repo: "Bitstamp"},
              {user: "kmadac", repo: "bitstamp-python-client"},
              {user: "unwitting", repo: "bitstampy"},
              {user: "willmoss", repo: "bitstamp-php-api"},
              {user: "nyg", repo: "bitstamp-ticker"},
              {user: "isotope11", repo: "bitstampede"},
              {user: "lamassu", repo: "lamassu-bitstamp"},
              {user: "pulsecat", repo: "cryptrade"},
              {user: "askmike", repo: "bitstamp-ws"},
              {user: "mmazi", repo: "bitstamp-api"},
              {user: "hivewallet", repo: "hiveapp-bitstamp"},
              {user: "matmar10", repo: "bitstamp"},
              {user: "esneider", repo: "bitstamp"},
              {user: "LoufL", repo: "bitstamp"},
              {user: "hanklords", repo: "bitstamp"},
              {user: "tgerring", repo: "hiveapp-bitstamptrader"},
              {user: "apancutt", repo: "bitstamp-api-php"},
              {user: "newell-purdue", repo: "bitstamper"},
              {user: "cgag", repo: "bitstamp-client"},
              {user: "5an1ty", repo: "bitstamp-api"},
              {user: "ajph", repo: "bitstamp-go"},
              {user: "ajph", repo: "ArBit"},
              {user: "goteppo", repo: "bitstamp-go"},
              {user: "Narsil", repo: "bitstamp-go"},
              {user: "indrekj", repo: "bitbot-trader"},
              {user: "mikaelwikman", repo: "bitstamp-realtime"},
              {user: "Netherdrake", repo: "bitstampplus"},
              {user: "wasabit", repo: "bitstampprice"},
              {user: "joggyjog", repo: "bitstampapi"},
              {user: "slickage", repo: "bitstamped"},
              {user: "sogasg", repo: "BitstampCollector"},
              {user: "x89", repo: "BitstampWidget"},
              {user: "stoko", repo: "bitstampAPIBridge"},
              {user: "GildedHonour", repo: "BitstampApi"},
              {user: "smartdan", repo: "BitstampClient"},
              {user: "flycodepl", repo: "bitstamp_ticker"},
              {user: "abwaters", repo: "bitstamp-api"},
              {user: "zhzhussupovkz", repo: "bitstamp-api"}
            ];

console.log("Number of repos = " + repos.length);

var users = Array();

var repoQueryFuncs = Array();

repos.forEach(function(repo){
  repoQueryFuncs.push(function(callback){
      getContributorsForRepo(repo.user, repo.repo, function(contributors){

        // delete contributors.meta;
        // console.log(contributors.length);
        if(contributors !== undefined){
          if(contributors.length !== undefined){
            contributors.forEach(function(contributor){
              contributor.bitcoinrepo = repo.repo;
            });
            users = users.concat(contributors);
          }
        }

        callback();
      });
  });
});

async.parallel(repoQueryFuncs, function(){
  //remove duplicates from array
  console.log(users);
  console.log("length of users array: " + users.length);

  users = users.filter(function(user){
    return( user !== undefined && user.login !== undefined);
  });

  var uniqueUsers = uniqueBy(users, JSON.stringify);

  console.log("length of unique users array: " + uniqueUsers.length);

  var emailQueryFuncs = Array();

  uniqueUsers.forEach(function(user){
    emailQueryFuncs.push(function(callback){
        github.user.getFrom({
            user: user.login
        }, function(err, res) {
            console.log("\n\n");
            console.log(res);
            if(res !== undefined){
              user.email = res.email;
              user.name = res.name;
            }
            callback();
        });
    });
  });

  async.parallel(emailQueryFuncs, function(){

    console.log(uniqueUsers);

    //save to JSON file here
    saveToJSON(uniqueUsers);
  });

});

function uniqueBy(a, key) {
    var seen = {};
    return a.filter(function(item) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}

function getContributorsForRepo(user, repoName, callback){
  github.repos.getContributors({
      user: user,
      repo: repoName
  }, function(err, res) {
      console.log("\n\n");
      // console.log(res);
      callback(res);
  });
}

function saveToJSON(contacts){
  var outputFilename = './contacts.json';

  fs.appendFile(outputFilename, JSON.stringify(contacts, null, 4), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to " + outputFilename);
      }
  });

}

function saveToCSV(contacts){

  var csv = "";

  logins.forEach( function(login){
    if(contacts[login].name !== undefined){
      csv += login + "," + contacts[login].name + "," + contacts[login].email + "\n";
    }
  });

  var outputFilename = './contacts.csv';

  fs.appendFile(outputFilename, csv, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("CSV saved to " + outputFilename);
      }
  });
}
