
async function getFeed() {
    //const RSS_URL = `https://www.vrt.be/vrtnws/nl.rss.breaking.xml`;
    const RSS_URL = 'https://www.vrt.be/vrtnws/nl.rss.headlines.xml'
    const response = await fetch('/feed');
    const data = await response.json();
    const paresedData = await (new window.DOMParser()).parseFromString(data.feedData, "text/xml");
    feed = paresedData.getElementsByTagName('entry');
    //DOMfeed = document.getElementById("feed");
    console.log(paresedData);

    for (let index = 0; index < feed.length; index++) {
        const entry = feed[index];
        //console.log(entry.innerHTML);
        const root = document.createElement('article');
        const summary = document.createElement('p');
        const title = document.createElement('h1');
        const image = document.createElement('img');
        image.setAttribute('src', entry.getElementsByTagName('link')[2].getAttribute('href'));
        title.textContent = entry.getElementsByTagName('title')[0].innerHTML;
        summary.textContent = entry.getElementsByTagName('summary')[0].innerHTML;
        root.append(title, image, summary, entry.getElementsByTagName('published')[0], entry.getElementsByTagName('updated')[0]);
        document.getElementById("feed").append(root);
    }
    //document.getElementById("feed").appendChild(feed);

    //return data;
}

/*
async function getFeed() {
    const xhr = new XMLHttpRequest();
    const url = 'https://www.vrt.be/vrtnws/nl.rss.headlines.xml';

    xhr.open('GET', url);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            document.getElementById("feed").innerHTML = xhttp.responseText;
        };
    }
    xhr.send();
}
*/

window.addEventListener('load', (event) => {

    getFeed();
    //document.getElementById("feed").appendChild(vlam);

    /*
    const RSS_URL = `https://www.vrt.be/vrtnws/nl.rss.headlines.xml`;
    fetch(RSS_URL, {
        mode: 'no-cors' // 'cors' by default
      }).catch((error) => console.error(error)).then((res) => {
        res.text().then((xmlTxt) => {
            var domParser = new DOMParser()
            let doc = domParser.parseFromString(xmlTxt, 'text/xml')
            
            doc.querySelectorAll('item').forEach((item) => {
                let h1 = document.createElement('h1')
                h1.textContent = item.querySelector('title').textContent
                document.querySelector('output').appendChild(h1)
            })
            
           console.log(xmlTxt);
           
        })
    });
    */
});