const axios = require('axios');

class WiseWolf {

    #APP_ID           = '';
    #SHORT_ANSWER_URL = 'https://api.wolframalpha.com/v1/spoken';
    #url              = '';

    /**
     * @param {string} text
    **/
    constructor(text, appId) {
        this.text = text.toLowerCase();
        this.#APP_ID = appId;
    }

    fetch = () => {
        this.#buildQuery();

        let data = this.#get(this.#url);
        return data;
    }

    #buildQuery = () => {
        this.#embedAppId()
        this.text = this.text.replace(/\s/g,'+');
        this.#url  = `${this.#SHORT_ANSWER_URL}${this.#url}&i=${this.text}`;
    };

    #embedAppId = () => {
        this.#url += `?appid=${this.#APP_ID}`;
    }

    #get = async(url) => {
        return new Promise((resolve,reject) => {
            axios.get(url)
                .then(response => resolve(response.data))    
                .catch(err => reject(err))
        });
    }
}

module.exports = { WiseWolf };