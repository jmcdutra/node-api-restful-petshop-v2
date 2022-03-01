class FieldError extends Error {
    constructor(field) {
        super(`O campo ${field} está inválido`)
        this.name = "FieldError"
        this.idError = 2
    }
}

module.exports = FieldError