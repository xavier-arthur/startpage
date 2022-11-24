const user = 'Arthur';
const Now = new Date();
let hours = Now.getHours();
let dayPeriod = '';

function clock() {
    const Clock = new Date();
    let seconds = Clock.getSeconds();
    let minutes = Clock.getMinutes();
    let hours   = Clock.getHours();

    return `${hours < 10 ? '0' + String(hours) : hours}:${minutes < 10 ? '0' + String(minutes) : minutes}:${seconds < 10 ? '0' + String(seconds) : seconds}`;
}

const asyncFetch = url => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => reject(err))
    });
}

const fetchMeme = async() => {
    const url = "https://meme-api.herokuapp.com/gimme";

    let json = await asyncFetch(url);

    if (document.querySelector('#meme').classList.contains('hidden'))
        document.querySelector('#meme').classList.remove('hidden');


    document.querySelector('#meme').setAttribute('src', json.url);
}

document.querySelector('#clock').textContent = clock();
let clockInterval = setInterval(() => {
    document.querySelector('#clock').textContent = clock();
}, 1000);


window.onload = function() {
    document.querySelector('#welcome').textContent = `Good ${library.getDayPeriod()}, ${user}`;
};

document.querySelectorAll('a').forEach(node => {
    node.setAttribute('href', 'https://' + node.getAttribute('href'));
});

const sendWolframForm = async(e, value) => {
    if (!(e.key === 'Enter' || e.keyCode === 13))
        return;

    value = value.replace('%', ' percent');
    e.target.value = value;

    let json = await fetch('/wolfram', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "prompt": value })
    })
    .then(response => response.json())
    .then(json => json);

    let responseBox = document.getElementById('wolfram-response');
    let responseContainer = document.getElementById('response-container');

    responseBox.innerText = json.payload ? json.payload : json.err;
    responseContainer.classList.remove('hidden');
}