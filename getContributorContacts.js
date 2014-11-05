var yql = require('yql');
var async = require('async');
var fs = require('fs');

//TODO: could use github API wrapper package: https://www.npmjs.org/package/github

var contacts = Object();
var logins = Array();

var repos = [
              "nanotube/supybot-bitcoin-marketmonitor",
              "goteppo/ArBit",
              "Sprylitol/btc-e_Trade_bot",
              "hyppo/Redbit",
              "mathisonian/benjamin",
              "wildbunny/bitcoinTradingFramework",
              "therussianphysicist/btc-trader",
              "JulyIGHOR/QtBitcoinTrader",
              "maxme/bitcoin-arbitrage",
              "gferrin/bitfinex",
              "lookfirst/bitfinex-promise",
              "ziggamon/node-bitcoin-trader",
              "Sea-of-BTC/Bitcoin-Trading-Client",
              "ipsBruno/trade-bot-btce",
              "maxcountryman/cryptotrade",
              "guifre/BTCWolf",
              "brandonrobertz/virtualcurrency-trading-alerts",
              "cheseaux/BitcoinTradingSystem",
              "pubnub/pubnub-bitcoin",
              "pentarh/btctrading-lib",
              "jwilkins/bitfinex",
              "scottbarr/bitfinex",
              "golikcoin/BitFinex",
              "v4n/bitfinex",
              "coolacid/bfxtrade",
              "npp1993/bitfinex-api",
              "gitmens/BitfinexToday",
              "twobeeb/BitfinexAPI",
              "KobeLeysen/BitfinexAPI",
              "bitbot-bitfinex",
              "gekko-bitfinex",
              "fractaldroid/bitfinex_orderbook",
              "velhoti/Cbot-Bitfinex",
              "NoWayHoze/nowayhoze.bitfinex",
              "evdubs/Harmonia",
              "MarkusTeufelberger/bitfinex2ledger",
              "caktux/bitfinex_api_python",
              "mariodian/bitfinex-auto-lend",
              "NoWayHoze/b___del_this",
              "dutchcoders/tradecollector",
              "cassus/btc-trader",
              "cthunman/btc_py_arb",
              "Herka/Bitcoin-Python-Livecharts",
              "sam808/mint-bitcoin",
              "brendanjcaffrey/bitcoin-notification-center-widget",
              "wijagels/btc-price-check",
              "pentarh/btctrading-lib",
              "tech-no-crat/bitcoineer",
              "node-traderbot-bitcoin",
              "kushti/btce-scala",
              "orangeudav/bitcoin_tools",
              "aandrewjeski/arcade",
              "ericjang/cryptocurrency_arbitrage",
              "kevinjcash/bitbot",
              "ssgier/Brahmian2",
              "pejrak/stampede",
              "kanybal/bitcoins",
              "towski/bitcoin_trader",
              "mateodelnorte/coinbase",
              "trexmatt/OKCoin-API",
              "siclark/btcchina",
              "opaolini/python-bitcurex",
              "voidloop/krakenapi",
              "5an1ty/kraken-api",
              "Beldur/kraken-go-api-client",
              "veox/python3-krakenex",
              "yfme/BTCChinaTrade",
              "dyzz/btcchina",
              "TerrorJack/btcchina.py",
              "zfei/btcchina-bot",
              "tjulk/Btcchina",
              "siclark/btcchina",
              "qinjiandong2010/btcchina",
              "GeforceLee/BtcChina",
              "prinyap/btcchina",
              "shallwe/btcchina_agent",
              "Lewis-Clayton/Kublai",
              "BTCChina/btcchina-api-cpp",
              "BTCChina/btcchina-websocket-api-python",
              "hemon/btcchina-php-sdk",
              "domnli/btcchina.api",
              "agent462/chinashop",
              "sathoro/BTCChina-MarketMaker",
              "osleg/btcchinaBot",
              "Shieffan/btcchina_deal",
              "lamassu/lamassu-btcchina",
              "dasixi/bitbot-btcchina",
              "shuaishuai/btcchina-cli",
              "buluzhai/btcchina-enhancement",
              "xianda/btcchina-python-api",
              "goace/bitcoin-ticker",
              "wulinlw/btcchina_php_api",
              "wulinlw/btcchina_php_api",
              "carica/btcchina-websocket-api",
              "kasuganosora/nodeBtcchinaapi",
              "rarach/exchange-bots",
              "tonychee7000/BtcChinaRT",
              "sirkapore/kraken_watch",
              "greentheo/krakenForR",
              "pstauble/BTC-Trend-Algorithm",
              "veox/krakenex",
              "payward/kraken-api-client",
              "nothingisdead/npm-kraken-api",
              "kraken-io/kraken-ruby",
              "leishman/kraken_ruby",
              "Jonahss/bitstamp-request",
              "logicalwire/bitstamp-API",
              "canselcik/bitstamp_stoploss",
              "francesco-bracchi/bitstamp-api",
              "jdilag/bitstamp-angular",
              "michie1/Bitstamp-notifier",
              "9uuso/bitstamp-vwap",
              "tgerring/bitstamp-js",
              "BitcoinMafia/bitstamp_api",
              "PamExx/Bitcoin---Bitstamp",
              "sirloins/bitstamp_utils",
              "makevoid/bitstamp_bot",
              "jesuRule/custom_bitstamp",
              "socec/bitstamp-simple",
              "maxtsepkov/nodejs-bitstamp2",
              "liw0/pyBitstampTicker",
              "conejoninja/bitstamp-php-api",
              "LuKaa/Bitstamp-API-CSharp",
              "ghandmann/perl-webservice-bitstamp",
              "alstonfernandez21/bitstamp_python_api",
              "ericcj24/bitstamp.api.monitor1",
              "peawormsworth/Finance-BitStamp-Socket",
              "kojnapp/bitstamp",
              "askmike/bitstamp",
              "migrap/Bitstamp",
              "kmadac/bitstamp-python-client",
              "unwitting/bitstampy",
              "willmoss/bitstamp-php-api",
              "nyg/bitstamp-ticker",
              "isotope11/bitstampede",
              "lamassu/lamassu-bitstamp",
              "pulsecat/cryptrade",
              "askmike/bitstamp-ws",
              "mmazi/bitstamp-api",
              "hivewallet/hiveapp-bitstamp",
              "matmar10/bitstamp",
              "esneider/bitstamp",
              "LoufL/bitstamp",
              "hanklords/bitstamp",
              "tgerring/hiveapp-bitstamptrader",
              "apancutt/bitstamp-api-php",
              "newell-purdue/bitstamper",
              "cgag/bitstamp-client",
              "5an1ty/bitstamp-api",
              "ajph/bitstamp-go",
              "Narsil/bitstamp-go",
              "indrekj/bitbot-trader",
              "mikaelwikman/bitstamp-realtime",
              "Netherdrake/bitstampplus",
              "wasabit/bitstampprice",
              "joggyjog/bitstampapi",
              "slickage/bitstamped",
              "sogasg/BitstampCollector",
              "x89/BitstampWidget",
              "stoko/bitstampAPIBridge",
              "GildedHonour/BitstampApi",
              "smartdan/BitstampClient",
              "flycodepl/bitstamp_ticker",
              "abwaters/bitstamp-api",
              "zhzhussupovkz/bitstamp-api"
            ];

repos.forEach(function(repo){
  var url = "http://github.com/" + repo + "/graphs/contributors-data";

  var getContributorsQuery = "select * from json where url='" + url + "'";

  console.log(getContributorsQuery);

  new yql.exec(getContributorsQuery, function(response) {
    console.log(response);
    if(response.query != null){
      if(response.query.results != null){
        if(response.query.results.json != null){
          if(response.query.results.json.json != null){
            var authors = response.query.results.json.json;
            authors.forEach(function(author){
              logins.push(author.author.login);
            });
          }
        }
      }
    }
    console.log(logins);

    var queryFuncs = Array();

    logins.forEach(function(login){
      contacts[login] = Object();
      contacts[login].repo = repo;

      var url = "http://github.com/" + login;

      var getEmailQuery = "SELECT * FROM data.html.cssselect WHERE url='" + url + "' AND css='.email'";

      queryFuncs.push(function(callback){
          new yql.exec(getEmailQuery, function(response) {
            // console.log(response.query.results.results);
            if(response.query.results.results != null){
              if(response.query.results.results.a != null){
                var email = response.query.results.results.a.content;
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
    });

  });
});

function saveFiles(contacts){
  var outputFilename = './contacts.json';

  fs.appendFile(outputFilename, JSON.stringify(contacts, null, 4), function(err) {
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

  var outputFilename = './contacts.csv';

  fs.appendFile(outputFilename, csv, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("CSV saved to " + outputFilename);
      }
  });
}
