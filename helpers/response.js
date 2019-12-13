class Response {
    constructor() {
        this.data = [];
        this.error = [];
        this.timestamp = new Date().toISOString();
    }

    setRespose(data, error, timestamp) {
        if (!error) {
            this.data.push(data);
            this.error = null;
        } else {
            this.error.push(error);
            this.data = null
        }
        this.timestamp = timestamp;
    }
}

module.exports = Response;