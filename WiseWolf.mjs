class WiseWolf {

    #APP_ID           = '36A38L-YTR5AL4UH7';
    #SHORT_ANSWER_URL = 'https://api.wolframalpha.com/v1/spoken';
    #url              = '';

    /**
     * @param {string} text
    **/
    constructor(text) {
        this.text = text.toLowerCase();
    }
    

    fetch = () => {
        this.#buildQuery();

        console.log("https://crossorigin.me/"  + this.#url);
        let json = this.#getJson(this.#url);
        // console.log(json);
    }

    #buildQuery = () => {
        this.#embedAppId()
        this.text = this.text.replace(/\s/g,'+');
        this.#url  = `${this.#SHORT_ANSWER_URL}${this.#url}&i=${this.text}`;
    };

    #embedAppId = () => {
        this.#url += `?appid=${this.#APP_ID}`;
    }

    #getJson = (url) => {
        return new Promise((resolve, reject) => {
            fetch(url, {  } })
                .then(response => response.json())
                .then(json => resolve(json))
            .catch(err => reject(err));
        });
    }
}