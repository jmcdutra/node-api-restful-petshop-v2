class EmptyError extends Error {
    constructor() {
        super("Não foram fornecidos dados para atualizar")
        this.name = "EmptyError"
        this.idError = 1
    }
}

module.exports = EmptyError