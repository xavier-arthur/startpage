const axios = require('axios');

class WiseWolf {

    #APP_ID           = '';
    static SHORT_ANSWER_URL = 'https://api.wolframalpha.com/v1/spoken';
    static SIMPLE_API_URL   = 'http://api.wolframalpha.com/v1/simple';
    #url              = '';

    /**
     * @param {string} text
    **/
    constructor(text, appId, endpoint) {
        this.text = text.toLowerCase();
        this.#APP_ID = appId;
        this.endpoint = endpoint;
    }

    fetch = () => {
        this.#buildQuery();

        let data = this.#get(this.#url);
        return data;
    }

    #buildQuery = () => {
        this.#embedAppId()
        this.text = this.text.replace(/\s/g,'+');
        this.#url  = `${this.endpoint}${this.#url}&i=${this.text}`;

        console.log(this.#url);
    };

    #embedAppId = () => {
        this.#url += `?appid=${this.#APP_ID}`;
    }

    #get = async(url) => {
        return new Promise((resolve,reject) => {
            axios.get(url, { responseType: 'arraybuffer' })
                .then(response => resolve(Buffer.from(response.data, 'binary').toString('base64')))
                .catch(err => reject(err))
        });
    }
}

module.exports = { WiseWolf };