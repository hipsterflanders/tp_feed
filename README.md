# tp_feed
Newsfeed reader on a toilet-paper roll can be viewed working here: http://tp-feed-reader.herokuapp.com/
* **Back-end** fetches news Articles from 2 RSS feeds from vrt news in index.js, stores them on the local server and serves them for fetching. 
  This is needed because the user's browser can't fetch the feed directly because of CORS setting in the RSS feeds.
  It also removes some serving load from the feed provider.
* **Front-end** the articles are fetched from the backend in tp-feedreader.js and put inside a div that is styled with surrounding divs to look like a tp-roll.
  There's also scripting to update the size of the roll based on the amount the user scrolled. The styling is applied through compiled scss, it's not recommended to edit the css files directly.
