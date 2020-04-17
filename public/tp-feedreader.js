
async function getFeed(feedDiv) {
    //const RSS_URL = `https://www.vrt.be/vrtnws/nl.rss.breaking.xml`;
    //const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.headlines.xml'
    const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.ook-dat-nog.xml';
    const response = await fetch('/feed');
    const data = await response.json();
    const parsedData = await (new window.DOMParser()).parseFromString(data.feedData, "text/xml");
    feed = parsedData.getElementsByTagName('entry');
    //DOMfeed = document.getElementById("feed");
    console.log(parsedData);
    //var feedDiv = document.getElementById("feed");

    for (let index = feed.length - 1; index > 0; index--) {
        const entry = feed[index];
        const root = document.createElement('article');
        const summary = document.createElement('p');
        const title = document.createElement('h1');
        const link = document.createElement('a');
        const image = document.createElement('img');
        link.setAttribute('href', entry.getElementsByTagName('link')[1].getAttribute('href'));
        image.setAttribute('src', entry.getElementsByTagName('link')[2].getAttribute('href'));
        title.textContent = entry.getElementsByTagName('title')[0].innerHTML;
        summary.textContent = entry.getElementsByTagName('summary')[0].innerHTML;
        link.append(title);
        root.append(link, image, summary, entry.getElementsByTagName('published')[0], entry.getElementsByTagName('updated')[0]);
        feedDiv.append(root);
    }
}

async function getFeed2(feedDiv) {
    //const RSS_URL = `https://www.vrt.be/vrtnws/nl.rss.breaking.xml`;
    //const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.headlines.xml'
    const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.ook-dat-nog.xml';
    const response = await fetch('/feed2');
    const data = await response.json();
    const parsedData = await (new window.DOMParser()).parseFromString(data.feedData, "text/xml");
    const feed2 = parsedData.getElementsByTagName('entry');
    //DOMfeed = document.getElementById("feed");
    console.log(parsedData);
    //var feedDiv = document.getElementById("feed");

    for (let index = feed2.length - 1; index > 0; index--) {
        const entry = feed2[index];
        const root = document.createElement('article');
        const summary = document.createElement('p');
        const title = document.createElement('h1');
        const link = document.createElement('a');
        const image = document.createElement('img');
        link.setAttribute('href', entry.getElementsByTagName('link')[1].getAttribute('href'));
        image.setAttribute('src', entry.getElementsByTagName('link')[2].getAttribute('href'));
        title.textContent = entry.getElementsByTagName('title')[0].innerHTML;
        summary.textContent = entry.getElementsByTagName('summary')[0].innerHTML;
        link.append(title);
        root.append(link, image, summary, entry.getElementsByTagName('published')[0], entry.getElementsByTagName('updated')[0]);
        feedDiv.append(root);
    }
    feedDiv.scrollTop = feedDiv.scrollHeight;
}

async function getFeeds(feedDiv){
    getFeed(feedDiv);
    getFeed2(feedDiv);
}

window.addEventListener('load', (event) => {

    var feedDiv = document.getElementById("feed");
    var rolDiv = document.getElementById("rol");
    var sideDiv = document.getElementById("rol-side");
    var insideDiv = document.getElementById("inside");
    getFeeds(feedDiv);

    feedDiv.addEventListener('scroll', () => {
        if (window.innerWidth / window.innerHeight < 1.5) {
            let change = (20 * feedDiv.scrollTop / feedDiv.scrollHeight) + 5;
            feedDiv.style.marginLeft = (change / 2 + 36.5) + 'vw';
            feedDiv.style.marginTop = (-change * 2 / 3 - 10.4) + 'vw';
            insideDiv.style.marginLeft = change / 2 + 'vw';
            insideDiv.style.marginTop = (change * 2 / 3) + 'vw';
            rolDiv.style.width = (change + 54) + 'vw';
            rolDiv.style.height = (4 * change / 3 + 20.8) + 'vw';
            rolDiv.style.borderRadius = (change + 15) + 'vw/100%'
            rolDiv.style.marginTop = (25 - change) * 2 / 3 + 'vw';
            rolDiv.style.marginLeft = (8 + (25 - change) / 2) + 'vw';
            sideDiv.style.width = (change + 15.6) + 'vw';
        } else {
            let change = (13 * feedDiv.scrollTop / feedDiv.scrollHeight) + 3.66;//
            feedDiv.style.marginLeft = (36.5 + change * 3 / 4) + 'vh';
            feedDiv.style.marginTop = (-change - 16) + 'vh';//
            insideDiv.style.marginLeft = change * 3 / 4 + 'vh';//
            insideDiv.style.marginTop = change + 'vh';//
            rolDiv.style.width = (change * 3 / 2 + 84) + 'vh';//
            rolDiv.style.height = (2 * change + 32) + 'vh';//
            rolDiv.style.borderRadius = (change * 3 / 2 + 24) + 'vh/100%'//
            rolDiv.style.marginTop = (16.66 - change) + 'vh';//
            rolDiv.style.marginLeft = (12.5 - change * 3 / 4) + 'vh';//
            sideDiv.style.width = (change * 3 / 2 + 24) + 'vh';//
        }
    });
});