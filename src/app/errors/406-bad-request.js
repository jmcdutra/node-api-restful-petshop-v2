class RequestError extends Error {
    constructor(contentType) {
        super(`O content-type ${contentType} não é suportado.`)
        this.name = "RequestError"
        this.idError = 3
    }
}

module.exports = RequestError