require('dotenv').config();
const Parser = require("rss-parser");
const utils = require('./utils/utils');
var time;
let parser = new Parser();

async function check_news() {
  parser.parseURL(process.env.NEWS_URL, function(err, feed) {
    if (err) {
      console.log("Error while fetching RSS feed:", err)
    }
    const feed_items = feed.items[0];
    if (time !== feed_items.pubDate) {
      utils.send_sms(feed_items.title, feed_items.link);
      time = feed_items.pubDate;
    } else {
      console.log("There is currently no new news!");
    }
  });
}

function news_check_loop() {
  console.log("Script started");
  check_news();
  setInterval(check_news, 1 * 60000);
}

news_check_loop();