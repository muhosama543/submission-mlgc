class FileException extends Error {
    constructor() {
        super(message)
        this.status = 413
        this.message = 'Payload content length greater than maximum allowed: 1000000'
        this.name = 'FileException'
    }
}

module.exports = FileException;