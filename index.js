const express = require('express');
const fetch = require('node-fetch');
//const fs = require('fs');
const app = express();
console.log('starting TP feed server');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Starting server at ${port}`));
app.use(express.static('public'));
app.use(express.json({ limit: '1Gb' }));


app.get('/feed', async (request, response) => {
    response.json({feedData:feedData});
});

var feedData = '';

async function getFeed_fetch() {
    //const RSS_URL = `https://www.vrt.be/vrtnws/nl.rss.breaking.xml`;
    const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.headlines.xml'
    const response = await fetch(RSS_URL, {
        mode: 'no-cors' // 'cors' by default
    });
    const xmltxt = await response.text();
    feedData = xmltxt;
    //const data = await (new window.DOMParser()).parseFromString(xmltxt, "text/xml");
    //console.log(xmltxt);

    //return data;
}

getFeed_fetch();
//var interval = setInterval(getFeed_fetch(),10000);