class Response {
    constructor() {
        this.data = [];
        this.error = [];
        this.timestamp = new Date().toISOString();
    }

    setRespose(data, error, timestamp) {
        this.data.push(data);
        this.error.push(error);
        this.timestamp = timestamp;
    }
}

module.exports = Response;