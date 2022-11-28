const library = {
    between(n, min, max) {
        if (n >= min && n <= max)
            return true;
        return false;
    },

    getDayPeriod(hours) {
        let dayPeriod = '';

        if (this.between(hours, 0, 6))
            dayPeriod = 'dawn'
        else if (this.between(hours, 6, 12)) 
            dayPeriod = 'morning';
        else if (this.between(hours, 12, 18))
            dayPeriod = 'afternoon';
        else 
            dayPeriod = 'evening';
        
        return dayPeriod;
    },

    newCard(name, url) {
        return `
            <a href="#">
                <div class="card">
                    <p class="card-title">${name}</p>
                    <p class="card-body">${url}</p>
                </div>
            </a>
        `;
    }
};