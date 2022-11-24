const bodyParser = require('body-parser');
const express   = require('express');
const { join }    = require('path');
const app       = express();
const PORT      = 5200;
const { WiseWolf } = require('./library/WiseWolf.js');

require('dotenv').config();

const STATIC_PATH = join(__dirname, 'public');

app.use((req, _, next) => {
    console.log(req.method + " " + req.url);
    next();
});

app.use(express.static(STATIC_PATH));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (_, res) => {
    res.sendFile(STATIC_PATH + 'index.html');
});

app.post('/wolfram', async(req, res) => {
    let post = req.body;

    let json = { 
        err: false,
        payload: false
    };
    
    if (post.prompt == null) {
        json.err = 'no prompt supplid for Wolfram Alpha';
        return res.send(json);
    }

    let whiteWolf = new WiseWolf(post.prompt, process.env.APPID);

    try {
        json.payload = await whiteWolf.fetch();
    } catch (err) {
        json.err = 'An error ocurred, Wolfram Alpha did not understand your question';
    }

    return res.send(json);
});



console.log(`server running at 127.0.0.1:${PORT}`);
app.listen(PORT);