require('dotenv').config();
const Parser = require("rss-parser");
const utils = require('./utils/utils');
let parser = new Parser();

// using a JS array for now
const media_links = ['https://www.iltalehti.fi/rss/uutiset.xml', 'https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET', 'https://www.hs.fi/rss/tuoreimmat.xml']

let latest_news = {} // lets use the object method instead of time-method

function check_news(link) {
    parser.parseURL(link, function(err, feed) { 
    if (err) {
      console.log("Error while fetchinng RSS feed:", err); return;
    }
    const feed_items = feed.items[0];
    if (!latest_news[link] || latest_news[link] !== feed_items.pubDate) {
      utils.send_sms(feed_items.title, feed_items.link);
      latest_news[link] = feed_items.pubDate;
    } else {
      console.log("There is currently no new news!")
    }
  });
}

function news_check_loop() {
  console.log("Script started");
  media_links.forEach((link) => {
    check_news(link);
  })
  setInterval(() => {
    media_links.forEach((link) => {
        check_news(link);
    });
  }, 60000);
}

news_check_loop();
