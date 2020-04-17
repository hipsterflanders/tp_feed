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
    response.json({feedData:feedData1});
});
app.get('/feed2', async (request, response) => {
    response.json({feedData:feedData2});
});

var feedData1 = '';
var feedData2 = '';

async function getFeed_fetch() {
    //const RSS_URL = `https://www.vrt.be/vrtnws/nl.rss.breaking.xml`;
    //const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.headlines.xml'
    const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.ook-dat-nog.xml';
    const RSS_URL2 = 'https://www.vrt.be/vrtnws/nl.rss.cultuur-&-media.xml';
    const response = await fetch(RSS_URL, {
        mode: 'no-cors' // 'cors' by default
    });
    const xmltxt = await response.text();
    const response2 = await fetch(RSS_URL2, {
        mode: 'no-cors' // 'cors' by default
    });
    const xmltxt2 = await response2.text();
    feedData1 = xmltxt;
    feedData2 = xmltxt2;
    const date = new Date();
    console.log('feed updated at:'+date.getHours()+':'+date.getMinutes()+' '+date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear());
    setTimeout(getFeed_fetch, 3600000);
}

getFeed_fetch();