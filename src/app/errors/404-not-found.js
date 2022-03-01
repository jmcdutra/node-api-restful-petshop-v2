class NotFoundError extends Error {
    constructor() {
        super("404: Não encontrado!")
        this.name = "NotFoundError"
        this.idError = 0
    }
}

module.exports = NotFoundError